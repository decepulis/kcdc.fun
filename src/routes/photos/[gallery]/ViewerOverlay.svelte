<script lang="ts">
	import { fly } from 'svelte/transition';
	import { InfoIcon, ChevronUpIcon } from 'svelte-feather-icons';

	import {
		isGalleryPhoto,
		isGalleryTitle,
		type GalleryItem
	} from '$lib/queries/routes/photos/[gallery]';
	import { activeKey } from '$lib/stores/viewer';

	import Exif from './ViewerOverlayExif.svelte';

	export let items: GalleryItem[];
	let activeItem: GalleryItem | undefined;
	$: activeItem = items.find((item) => item._key === $activeKey);

	let showOverlay = true;
	let expandOverlay = false;
	// whenever the activeItem changes, collapse the overlay
	$: if (activeItem) expandOverlay = false;

	// detect keyboard up arrow to expand overlay
	const onKeyUp = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp') {
			if (!showOverlay) {
				showOverlay = true;
			} else {
				expandOverlay = true;
			}
		} else if (e.key === 'ArrowDown') {
			if (expandOverlay) {
				expandOverlay = false;
			} else {
				showOverlay = false;
			}
		}
	};
</script>

<svelte:window on:keyup={onKeyUp} />
{#if showOverlay && activeItem && !isGalleryTitle(activeItem) && (isGalleryPhoto(activeItem) || activeItem.description)}
	{#key activeItem._key}
		<div
			class="overlay"
			class:expanded={expandOverlay}
			on:click={() => (expandOverlay = !expandOverlay)}
			transition:fly={{ y: 15 }}
		>
			<button
				class="expand-overlay control"
				type="button"
				aria-label="expand-overlay"
				class:active={expandOverlay}
				on:click={(e) => {
					expandOverlay = !expandOverlay;
					e.stopImmediatePropagation();
				}}><ChevronUpIcon /></button
			>
			{#if activeItem.description}
				<div class="description">
					{activeItem.description}
				</div>
			{/if}
			{#if isGalleryPhoto(activeItem)}
				<Exif exif={activeItem.photo.asset.metadata.exif} />
			{/if}
		</div>
	{/key}
{/if}
<button
	class="show-overlay control"
	type="button"
	on:click={() => {
		if (showOverlay) {
			showOverlay = false;
			expandOverlay = false;
		} else {
			showOverlay = true;
		}
	}}
	class:active={showOverlay}
	aria-label="Show photo information"
>
	<InfoIcon />
</button>

<style>
	.overlay {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		max-height: 100%;
		overflow: scroll;
		z-index: 10;

		padding: 3rem 4rem 2rem;
		min-height: 20vh;
		text-shadow: 0 0 10px black;
		background: linear-gradient(
			rgba(0, 0, 0, 0),
			rgba(0, 0, 0, 0.5) 4rem,
			rgba(0, 0, 0, 0.75) 20vh,
			rgba(0, 0, 0, 1)
		);

		display: grid;
		grid-template-columns: auto;
		gap: 2rem;
		justify-content: center;

		will-change: transform;
		transform: translateY(calc(100% - 5.5rem));
		transition: transform var(--transition-duration-long);
		cursor: pointer;
	}
	@media (min-width: 64rem) {
		.overlay {
			grid-template-columns: auto auto;
		}
	}
	.overlay.expanded {
		transform: translateY(0);
	}
	.description {
		max-width: 65ch;
		white-space: pre-wrap;
	}
	.show-overlay.control {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 100;
	}
	.expand-overlay.control {
		position: absolute;
		top: 0;
		left: 50%;

		color: #fff;
	}
	.expand-overlay.control.active {
		transform: scaleY(-1);
	}
	.overlay:hover .expand-overlay.control:not(.active) {
		color: rgb(var(--cx));
	}
</style>
