<script lang="ts">
	import LazyImage from '$lib/components/LazyImage.svelte';

	import {
		isGalleryPhoto,
		isGalleryTitle,
		isGalleryVideo,
		type GalleryItem
	} from '$lib/queries/routes/photos/[gallery]';
	import type { ReferencedSanityImageObject } from '$lib/queries/snippets/image';
	import { urlFor } from '$lib/sanity/client';
	import { isDialogOpen, scrollToKey } from '$lib/stores/viewer';

	export let items: GalleryItem[];

	const gridSize = 100;
	const gridGap = 4;

	const getSanityImage = (
		asset: ReferencedSanityImageObject['asset'],
		xScale: number,
		yScale: number,
		dpr: number
	) => {
		const width = gridSize * xScale * dpr;
		const height = gridSize * yScale * dpr;
		return urlFor(asset).size(width, height).url();
	};
	const getMuxImage = (playbackId: string, xScale: number, yScale: number, dpr: number) => {
		const width = gridSize * xScale * dpr;
		const height = gridSize * yScale * dpr;
		return `https://image.mux.com/${playbackId}/thumbnail.jpg?width=${width}&height=${height}&fit_mode=smartcrop`;
	};

	const openDialogWithKey = (key: string) => {
		$isDialogOpen = true;
		$scrollToKey = key;
	};
</script>

<ul class="grid" style:--grid-size={gridSize} style:--grid-gap={gridGap}>
	{#each items as item}
		<li class="grid--item" style:--height={item.gridHeight} style:--width={item.gridWidth}>
			{#if isGalleryTitle(item)}
				<h2 class="title">{item.title}</h2>
			{:else if isGalleryPhoto(item)}
				{@const asset = item.photo.asset}
				{@const image = getSanityImage(asset, item.gridWidth, item.gridHeight, 1)}
				{@const image2x = getSanityImage(asset, item.gridWidth, item.gridHeight, 2)}
				<button
					class="image-container"
					on:click={() => openDialogWithKey(item._key)}
					style:--background={asset.metadata.palette?.lightMuted.background}
				>
					<LazyImage src={image} srcset="{image} 1x, {image2x} 2x," alt={item.description || ''} />
				</button>
			{:else if isGalleryVideo(item)}
				{@const asset = item.video.asset}
				{@const image = getMuxImage(asset.playbackId, item.gridWidth, item.gridHeight, 1)}
				{@const image2x = getMuxImage(asset.playbackId, item.gridWidth, item.gridHeight, 2)}
				<button class="video-container" on:click={() => openDialogWithKey(item._key)}>
					<LazyImage src={image} srcset="{image} 1x, {image2x} 2x" alt={item.description || ''} />
				</button>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.grid {
		margin: 0;
		margin-left: calc(-1rem + var(--grid-gap) * 1px);
		margin-right: calc(-1rem + var(--grid-gap) * 1px);
		padding: 0;
		list-style-type: none;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(calc(var(--grid-size) * 1px), 1fr));
		grid-auto-flow: row dense;
		gap: calc(var(--grid-gap) * 1px);
		justify-content: center;
	}

	.grid--item {
		grid-row: span var(--height);
		grid-column: span var(--width);

		position: relative;
		padding-bottom: calc(100% * var(--height) / var(--width));
	}
	.grid--item > * {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.title {
		margin: 0;
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.image-container {
		background-color: var(--background);
	}
	.video-container {
		background-color: #ccc;
	}
	.video-container:after {
		content: '';
		position: absolute;
		inset: 0;
		filter: drop-shadow(0 0rem 0.66rem rgba(0, 0, 0, 1));
		background-image: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTEzLjkgOEwwIDE2VjBsMTMuOSA4eiIgZmlsbD0iI2ZmZiIgLz4KPC9zdmc+');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 1rem;
	}
	button {
		appearance: none;
		padding: 0;
		margin: 0;
		border: none;
		cursor: pointer;
		box-shadow: 0px 0px 0px 0px rgb(var(--cx));
		transition: box-shadow var(--transition-duration);
	}
	button:hover {
		box-shadow: 0px 0px 0px calc(0.66px * var(--grid-gap)) rgb(var(--cx));
	}
	.image-container :global(img),
	.video-container :global(img) {
		width: 100%;
		height: 100%;
	}
</style>
