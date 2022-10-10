<script context="module" lang="ts">
	import { browser } from '$app/environment';
	// let's keep track of which items are currently on screen.
	// this enables two things:
	// 1. updating the currentItem state
	// 2. loading children (virtual scrolling)

	// We begin by creating a new IntersectionObserver instance
	// here in the module context,
	// where it will be shared between all instances of ViewerItem
	let observer: IntersectionObserver;
	if (browser) {
		const observerConfig: IntersectionObserverInit = {
			root: null,
			threshold: [0.01, 1]
		};
		observer = new IntersectionObserver((items) => {
			items.forEach((item) => {
				if (item.isIntersecting) {
					item.target.dispatchEvent(new Event('intersectionstart'));
				} else {
					item.target.dispatchEvent(new Event('intersectionend'));
				}
			});
		}, observerConfig);
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import {
		isGalleryPhoto,
		isGalleryTitle,
		isGalleryVideo,
		type GalleryItem
	} from '$lib/queries/routes/photos/[gallery]';
	import { urlFor } from '$lib/sanity/client';
	import { activeKey } from '$lib/stores/viewer';
	import { hash } from '$lib/stores/hash';
	import LazyImage from '$lib/components/LazyImage.svelte';

	import SvgPlaceholder from './SvgPlaceholder.svelte';

	export let item: GalleryItem;
	let itemElement: HTMLLIElement;
	let isIntersecting = false;

	onMount(() => {
		import('@mux/mux-player');
	});
	onMount(() => {
		if (observer) {
			observer.observe(itemElement);
			return () => {
				observer.unobserve(itemElement);
			};
		}
	});

	const onIntersectionStart = () => {
		isIntersecting = true;
		$activeKey = item._key;
		$hash = item._key;
	};
	const onIntersectionEnd = () => {
		isIntersecting = false;
	};
</script>

<li
	class="item"
	bind:this={itemElement}
	data-key={item._key}
	on:intersectionstart={onIntersectionStart}
	on:intersectionend={onIntersectionEnd}
>
	{#if isGalleryTitle(item)}
		<h2 class="title">{item.title}</h2>
	{:else if isGalleryPhoto(item)}
		{@const asset = item.photo.asset}
		{@const { palette, dimensions } = asset.metadata}
		<SvgPlaceholder aspectRatio={dimensions.aspectRatio} color={palette?.lightMuted.background} />
		{#if isIntersecting}
			<LazyImage
				src={urlFor(asset).dpr(1)}
				srcset="{urlFor(asset).dpr(1)} 1x, {urlFor(asset).dpr(2)} 2x"
				alt={item.description || ''}
			/>
		{/if}
	{:else if isGalleryVideo(item)}
		{#if isIntersecting}
			<mux-player stream-type="on-demand" playback-id={item.video.asset.playbackId} />
		{/if}
	{/if}
</li>

<style>
	.item {
		scroll-snap-align: center;
		height: 100%;
		flex: 0 0 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
	}
	.item :global(svg),
	.item :global(img),
	.item :global(mux-player) {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		object-fit: contain;
	}
	.title {
		padding: 1rem;
		text-align: center;
	}
</style>
