<script lang="ts">
	import { onMount } from 'svelte';
	import { hash } from '../../stores/hash';

	import CloudinaryViewer from './Viewer.svelte';

	import { gallerySrc, gallerySrcset, placeholderSrc } from './utils';
	import type { Context, Photos, Resource } from './types';

	export let cloudName: string;
	export let photos: Photos;

	// Sort list of photos
	const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
	const sortWithCollator = (resourceA: Resource, resourceB: Resource) =>
		collator.compare(resourceA.public_id, resourceB.public_id);
	$: photos.resources.sort(sortWithCollator);

	let imageRefsByPublicId: { [publicId: string]: HTMLImageElement } = {};

	// Set up grid
	// the base width and height as well as the feature width and height
	// are the dimensions sent to cloudinary.
	// they're the approximate size of the grid elements
	const baseWidth = 100;
	const heightRatio = 1;
	const baseHeight = baseWidth * heightRatio;
	const gridGap = 4;

	// Here, we calculate a width for grid items in order to fit
	// as many whole number grid items into the available width as possible.
	// let gridOffsetWidth: number;
	// const minRows = 3;
	// $: targetGridItemCount = Math.max(Math.floor(gridOffsetWidth / baseWidth), minRows);
	// $: totalRowGapWidth = (targetGridItemCount - 1) * gridGap;
	// $: gridWidth = gridOffsetWidth / targetGridItemCount - totalRowGapWidth / targetGridItemCount;
	// $: gridHeight = gridWidth * heightRatio;

	// For items that have height or width multipliers in their context,
	// we need these utility functions:
	const getContextWidthFactor = (context: Context) => {
		const contextWidth = parseInt(context?.custom.width);
		return isNaN(contextWidth) ? 1 : contextWidth;
	};
	const getContextHeightFactor = (context: Context) => {
		const contextHeight = parseInt(context?.custom.height);
		return isNaN(contextHeight) ? 1 : contextHeight;
	};
	const getContextWidth = (context: Context) =>
		baseWidth * getContextWidthFactor(context) + (getContextWidthFactor(context) - 1) * gridGap;
	const getContextHeight = (context: Context) =>
		baseHeight * getContextHeightFactor(context) + (getContextHeightFactor(context) - 1) * gridGap;

	// Lazy load photos as they appear
	let observer: IntersectionObserver | undefined = undefined;
	let observed = new Set<string>();

	onMount(() => {
		if (typeof IntersectionObserver === 'undefined') return;
		const observerConfig: IntersectionObserverInit = {
			root: null,
			threshold: [0.25, 0.33, 0.5]
		};
		observer = new IntersectionObserver((entries, self) => {
			entries.forEach((entry) => {
				const intersectionRatio = entry.intersectionRatio;

				const target = entry.target as HTMLImageElement;
				const { publicid: publicId } = target.dataset;

				// We observe standard images at 50%.
				// and double-height images at 25%
				// and triple-height images at 16.6% (etc)
				// This way, a whole row --
				// i.e., the top half of a featured image and a whole standard image --
				// loads at once
				const observeAt = 0.5 / parseInt(getComputedStyle(target).getPropertyValue('--height'));
				const shouldObserve = intersectionRatio >= observeAt;

				if (shouldObserve) {
					// place placeholder in background
					// and image in source
					observed = new Set([...observed, publicId]);
					// Remove observer
					self.unobserve(target);
				}
			});
		}, observerConfig);

		return () => observer.disconnect();
	});

	$: {
		// fallback behavior for those poor IE users
		if (typeof IntersectionObserver === 'undefined') {
			observed = new Set(photos.resources.map(({ public_id }) => public_id));
			break $;
		}

		// attach observers to images as they come in
		// once the observer and image refs are ready
		if (typeof observer === 'undefined') break $;
		if (Object.keys(imageRefsByPublicId).length === 0) break $;

		Object.values(imageRefsByPublicId).forEach((imageRef) => {
			observer.observe(imageRef);
		});
	}

	let loaded = new Set<string>();
	const onImageLoad = (e: Event) => {
		const target = e.target as HTMLImageElement;
		const { publicid: publicId } = target.dataset;
		loaded = new Set([...loaded, publicId]);
	};
</script>

{#if typeof photos !== 'undefined'}
	<CloudinaryViewer {photos} {cloudName} />
{/if}
<div class="photo-container">
	<ul>
		{#each photos.resources as { context, public_id: publicId }}
			{#if context?.custom.caption}
				<li class="photo-caption" style="--url:url({placeholderSrc({ cloudName, publicId })});">
					<h3 class="h5 i">{context.custom.caption}</h3>
				</li>
			{/if}
			<li
				class:loaded={loaded.has(publicId)}
				class="photo-list-item"
				style="
				--url:url({placeholderSrc({ cloudName, publicId })});
				--height:{getContextHeightFactor(context)};
				--width:{getContextWidthFactor(context)};"
			>
				<button aria-label="Open modal with {publicId}" on:click={() => hash.set(publicId)}>
					<img
						data-publicid={publicId}
						on:load={onImageLoad}
						bind:this={imageRefsByPublicId[publicId]}
						srcset={observed.has(publicId)
							? gallerySrcset({
									cloudName,
									publicId,
									width: getContextWidth(context),
									height: getContextHeight(context)
							  })
							: ''}
						src={observed.has(publicId)
							? gallerySrc({
									cloudName,
									publicId,
									width: getContextWidth(context),
									height: getContextHeight(context)
							  })
							: ''}
						alt=""
					/>
				</button>
			</li>
		{/each}
	</ul>
</div>

<style>
	.photo-container {
		grid-column: fullpage-start / fullpage-end !important;

		padding-left: var(--gap);
		padding-right: var(--gap);
		padding-left: max(env(safe-area-inset-left), var(--gap));
		padding-right: max(env(safe-area-inset-right), var(--gap));
	}
	ul {
		list-style-type: none;

		max-width: calc(var(--content-width) * 2);
		margin: 0 auto;
		padding: 0;

		--grid-gap: 4px;

		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		grid-auto-flow: row dense;
		gap: var(--grid-gap);
		justify-content: center;
	}
	@media (max-width: 340px) {
		/*
			I really don't want the gallery to drop below three columns
			so for very tiny displays, there's this code
		 */
		ul {
			margin-left: calc(-1 * var(--gap));
			margin-right: calc(-1 * var(--gap));
		}
	}
	.photo-list-item {
		margin: 0;
		position: relative;

		--height: 1;
		--width: 1;

		grid-row: span var(--height);
		grid-column: span var(--width);

		/* lock aspect ratio */
		padding-bottom: calc(100% * var(--height) / var(--width));
	}
	.photo-caption {
		grid-column: span 2;

		margin: 0;
		padding: var(--gap);

		text-align: right;
		text-shadow: 0 0 3px black;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		background-color: rgb(128, 128, 128);
		background-image: var(--url);
		position: relative;
	}
	.photo-caption * {
		margin: 0;
		padding: 0;
		z-index: 10;
	}
	.photo-list-item * {
		z-index: 10;
	}

	button {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;

		background: none;
		border: 0;
		padding: 0;
		margin: 0;
		font-family: inherit;
		font-size: inherit;
		font-style: inherit;
		color: inherit;

		cursor: pointer;
	}
	.photo-list-item:before,
	.photo-list-item:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.photo-list-item:after {
		background-image: var(--url);
		z-index: 2;
	}
	.photo-list-item:before {
		background-color: rgba(var(--cx), 0);

		transform: scale(1);
		will-change: transform;
		transition: transform var(--transition-duration), background-color 0s var(--transition-duration);
		z-index: 1;
	}
	.photo-list-item:hover:before,
	.photo-list-item:active:before {
		background-color: rgba(var(--cx), 1);
		transition: transform var(--transition-duration), background-color 0s 0s;
	}
	.photo-list-item:hover:before {
		transform: scaleX(calc(1 + 0.06 / var(--width))) scaleY(calc(1 + 0.06 / var(--height)));
	}
	.photo-list-item:active:before {
		transform: scaleX(calc(1 + 0.03 / var(--width))) scaleY(calc(1 + 0.03 / var(--height)));
	}

	img {
		width: 100%;
		height: 100%;

		position: relative;
		opacity: 0;
		transition: opacity var(--transition-duration-long);
	}
	.loaded img {
		opacity: 1;
	}
</style>
