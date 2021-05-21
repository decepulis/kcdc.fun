<script lang="ts">
	import { onMount } from 'svelte';

	export let cloudName: string;
	export let tag: string;

	// Fetch list of photos
	interface Resource {
		public_id: string;
		version: number;
		format: string;
		width: number;
		height: number;
		created_at: string;
		type: string;
	}
	interface Photos {
		resources: Array<Resource>;
		updated_at: string;
	}

	let photos: Photos;
	let publicIds: string[];
	let featured: Photos;
	let featuredIds: Set<string>;

	let imageRefsByPublicId: { [publicId: string]: HTMLImageElement } = {};

	$: {
		if (typeof photos === 'undefined') break $;
		publicIds = photos.resources.map((resource) => resource.public_id);
	}
	$: {
		if (typeof featured === 'undefined') break $;
		featuredIds = new Set(featured.resources.map((resource) => resource.public_id));
	}

	onMount(async () => {
		const res = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`);
		photos = await res.json();
	});
	onMount(async () => {
		const res = await fetch(
			`https://res.cloudinary.com/${cloudName}/image/list/${tag}-featured.json`
		);
		featured = await res.json();
	});

	$: ready = typeof publicIds !== 'undefined' && typeof featuredIds !== 'undefined';

	// Set up grid
	// the base width and height as well as the feature width and height
	// are the dimensions sent to cloudinary.
	// they're the approximate size of the grid elements
	const baseWidth = 100;
	const heightRatio = 1;
	const baseHeight = baseWidth * heightRatio;

	const gridGap = 4;
	const featureRatio = 2;
	const featureWidth = baseWidth * featureRatio + gridGap;
	const featureHeight = baseHeight * featureRatio + gridGap;

	// Here, we calculate a width for grid items in order to fit
	// as many whole number grid items into the available width as possible.
	let gridOffsetWidth: number;
	$: targetGridItemCount = Math.floor(gridOffsetWidth / baseWidth);
	$: totalRowGapWidth = (targetGridItemCount - 1) * gridGap;
	$: gridWidth = gridOffsetWidth / targetGridItemCount - totalRowGapWidth / targetGridItemCount;
	$: gridHeight = gridWidth * heightRatio;

	// Some URL generators for that grid
	const featureUrl = (publicId: string) =>
		`https://res.cloudinary.com/decepulis/image/upload/w_${featureWidth},h_${featureHeight},c_fill/q_auto/f_auto/${publicId}`;
	const standardUrl = (publicId: string) =>
		`https://res.cloudinary.com/decepulis/image/upload/w_${baseWidth},h_${baseHeight},c_fill/q_auto/f_auto/${publicId}`;
	const placeholderUrl = (publicId: string) =>
		`https://res.cloudinary.com/decepulis/image/upload/b_auto:predominant,c_pad,w_iw_div_2,ar_1/c_fill,g_south_east,w_1,h_1/q_auto/f_auto/${publicId}`;

	// Finally, lazy load photos as they appear
	let observer: IntersectionObserver | undefined = undefined;
	let observed = new Set<string>();
	onMount(() => {
		if (typeof IntersectionObserver === 'undefined') return;
		const observerConfig: IntersectionObserverInit = {
			root: null,
			threshold: [0.25, 0.5]
		};
		observer = new IntersectionObserver((entries, self) => {
			entries.forEach((entry) => {
				const intersectionRatio = entry.intersectionRatio;

				const target = entry.target as HTMLImageElement;
				const { publicid: publicId } = target.dataset;

				// We observed featured images (double-height) at 25%
				// and standard images at 50%.
				// This way, a whole row --
				// i.e., the top half of a featured image and a whole standard image --
				// loads at once
				const shouldObserve = featuredIds.has(publicId)
					? intersectionRatio >= 0.25
					: intersectionRatio >= 0.5;
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
		// fallback behavior for IE
		if (typeof IntersectionObserver === 'undefined') break $;

		// attach observers to images as they come in
		// once the observer and image refs are ready
		if (typeof observer === 'undefined') break $;
		if (Object.keys(imageRefsByPublicId).length === 0) break $;

		Object.entries(imageRefsByPublicId).forEach(([publicId, imageRef]) => {
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

<div class="photo-container">
	{#if ready}
		<ul
			bind:offsetWidth={gridOffsetWidth}
			style="--gridWidth:{gridWidth}px;--gridHeight:{gridHeight}px;--gridGap:{gridGap}px;"
		>
			{#each publicIds.sort() as publicId}
				<li
					class:featured={featuredIds.has(publicId)}
					style="background-image:url({placeholderUrl(publicId)});"
				>
					<img
						data-publicid={publicId}
						src={observed.has(publicId)
							? featuredIds.has(publicId)
								? featureUrl(publicId)
								: standardUrl(publicId)
							: ''}
						class:loaded={loaded.has(publicId)}
						on:load={onImageLoad}
						bind:this={imageRefsByPublicId[publicId]}
						alt=""
					/>
				</li>
			{/each}
		</ul>
	{:else}
		<p>...loading</p>
	{/if}
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

		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(var(--gridWidth), var(--gridWidth)));
		grid-auto-rows: var(--gridHeight);
		grid-auto-flow: row dense;
		gap: var(--gridGap);
	}
	li {
		margin: 0;
		overflow: hidden;
		transition: transform var(--transition-duration), box-shadow var(--transition-duration);
		cursor: pointer;
	}
	li:hover {
		transform: scale(1.03);
		box-shadow: 0 0 0 calc(var(--gridGap) / 2) rgb(var(--cx));
	}
	li:active {
		transform: scale(1);
	}

	.featured {
		grid-column: span 2;
		grid-row: span 2;
	}
	img {
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity var(--transition-duration);
	}
	img.loaded {
		opacity: 1;
	}
</style>
