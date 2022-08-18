<script lang="ts">
	import { scale } from 'svelte/transition';

	import { scrollToKey } from '$lib/stores/viewer';
	import type { GalleryItem } from '$lib/queries/routes/photos/[gallery]';

	import Item from './ViewerScrollItem.svelte';
	import { onMount } from 'svelte';

	export let items: GalleryItem[];

	// when scrollToKey changes, we... scroll to that key!
	let element: HTMLUListElement;
	$: {
		if (element && $scrollToKey) {
			const item = element.querySelector(`[data-key="${$scrollToKey}"]`);
			if (item) {
				item.scrollIntoView();
			}
		}
	}

	// we allow instant scrolling while the element instantiates.
	// once loaded, we switch to smooth scrolling
	let smooth = false;
	onMount(() => (smooth = true));
</script>

<ul class="items" bind:this={element} class:smooth transition:scale={{ opacity: 1, start: 0.95 }}>
	{#each items as item}
		<Item {item} />
	{/each}
</ul>

<style>
	.items {
		scroll-snap-type: x mandatory;
		list-style-type: none;
		margin: 0;
		padding: 0;
		position: absolute;
		left: 0;
		width: 100%;
		top: 3rem;
		height: calc(100% - 6rem);
		display: flex;
		gap: 1rem;
		overflow-x: scroll;
	}
	.items.smooth {
		scroll-behavior: smooth;
	}
</style>
