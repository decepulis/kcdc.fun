<script lang="ts">
	import { fade } from 'svelte/transition';

	import { fullSizeSrc, placeholderSrc } from './utils';

	export let cloudName: string;
	export let publicId: string;
	export let width: number;
	export let height: number;
	export let sizeByWidth: boolean;
	export let active: boolean;

	let loaded = false;
	$: src = fullSizeSrc({ cloudName, publicId });
	$: {
		// unload if active state changes
		if (!active) {
			loaded = false;
		}
	}
</script>

<div
	class="image-container"
	class:size-by-width={sizeByWidth}
	style="--width:{width};--height:{height};--url:url({placeholderSrc({ cloudName, publicId })})"
>
	{#if active}
		<img
			{src}
			on:load={() => (loaded = true)}
			out:fade={{ duration: 250 }}
			class:fade-in={loaded}
			alt=""
		/>
	{/if}
</div>

<style>
	.image-container {
		position: absolute;
		cursor: auto;
		background-color: black;
		background-image: var(--url);
	}
	.image-container:not(.size-by-width) {
		height: 100vh;
		top: 0;
		width: calc(100vh * var(--width) / var(--height));
		left: 50%;
		transform: translateX(-50%);
	}
	.image-container.size-by-width {
		width: 100vw;
		left: 0;
		height: calc(100vw * var(--height) / var(--width));
		top: 50%;
		transform: translateY(-50%);
	}
	img {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;

		opacity: 0;
		transition: opacity 250ms;
	}
	img.fade-in {
		opacity: 1;
	}
</style>
