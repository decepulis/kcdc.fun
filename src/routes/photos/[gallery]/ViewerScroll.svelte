<script lang="ts">
	import { scale } from 'svelte/transition';
	import { ArrowLeftIcon, ArrowRightIcon } from 'svelte-feather-icons';

	import { scrollToKey, activeKey } from '$lib/stores/viewer';
	import type { GalleryItem } from '$lib/queries/routes/photos/[gallery]';

	import Item from './ViewerScrollItem.svelte';
	import { onMount } from 'svelte';

	export let items: GalleryItem[];
	let itemKeys = items.map((item) => item._key);

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

	// Next, some buttons in the corner
	$: hasPreviousPhoto = $activeKey !== null && itemKeys.indexOf($activeKey) > 0;
	$: prevPhoto = () => {
		if ($activeKey) {
			const currentIndex = itemKeys.indexOf($activeKey);
			const previousIndex = currentIndex - 1;
			if (currentIndex !== -1 && previousIndex >= 0) {
				$scrollToKey = itemKeys[previousIndex];
			}
		}
	};
	$: hasNextPhoto = $activeKey !== null && itemKeys.indexOf($activeKey) < itemKeys.length - 1;
	$: nextPhoto = () => {
		if ($activeKey) {
			const currentIndex = itemKeys.indexOf($activeKey);
			const nextIndex = currentIndex + 1;
			if (currentIndex !== -1 && nextIndex < itemKeys.length) {
				$scrollToKey = itemKeys[nextIndex];
			}
		}
	};

	// and finally, some keyboard controls
	const onKeyUp = (e: KeyboardEvent) => {
		if (e.key === 'ArrowLeft') {
			prevPhoto();
		} else if (e.key === 'ArrowRight') {
			nextPhoto();
		}
	};
</script>

<svelte:window on:keyup={onKeyUp} />
<ul class="items" bind:this={element} class:smooth transition:scale={{ opacity: 1, start: 0.95 }}>
	{#each items as item}
		<Item {item} />
	{/each}
</ul>
<div class="slide-controls">
	<button
		class="previous control"
		type="button"
		on:click={prevPhoto}
		disabled={!hasPreviousPhoto}
		aria-label="Show previous photo"
	>
		<ArrowLeftIcon />
	</button>
	<button
		class="next control"
		type="button"
		on:click={nextPhoto}
		disabled={!hasNextPhoto}
		aria-label="Show next photo"
	>
		<ArrowRightIcon />
	</button>
</div>

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
	.slide-controls {
		position: absolute;
		bottom: 0;
		right: 0;
		display: flex;
		z-index: 10000;
	}
</style>
