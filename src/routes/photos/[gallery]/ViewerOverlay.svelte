<script lang="ts">
	import { fly } from 'svelte/transition';
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
	$: console.log({ $activeKey, activeItem });

	let overlayElement: HTMLDivElement;
	const forwardScrollY = (e: WheelEvent) => {
		// pointer events are disabled in css on this overlay container
		// so that the photo gallery could be horizontall scrolled.
		// This function forwards y wheel events to the overlay container
		if (overlayElement) {
			overlayElement.scrollBy({ top: e.deltaY });
		}
	};
</script>

<svelte:window on:wheel={forwardScrollY} />
{#if activeItem}
	{#key activeItem._key}
		<div class="overlay" bind:this={overlayElement} transition:fly={{ y: 100 }}>
			<div class="content">
				{#if !isGalleryTitle(activeItem) && activeItem.description}
					<div class="description">
						{activeItem.description}
					</div>
				{/if}
				{#if isGalleryPhoto(activeItem)}
					<Exif exif={activeItem.photo.asset.metadata.exif} />
				{/if}
			</div>
		</div>
	{/key}
{/if}

<style>
	.overlay {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100vh;
		padding-top: 85vh;
		overflow-y: scroll;
		pointer-events: none;
		z-index: 1;
	}
	.content {
		padding: 2rem 4rem;
		min-height: calc(100vh / 3);
		text-shadow: 0 0 10px black;
		background: linear-gradient(
			rgba(0, 0, 0, 0),
			rgba(0, 0, 0, 0.5) 4rem,
			rgba(0, 0, 0, 0.75) calc(100vh / 3),
			rgba(0, 0, 0, 1)
		);

		display: flex;
		gap: 2rem;
		align-items: start;
		justify-content: center;
	}
	.description {
		width: 65ch;
	}
</style>
