<script lang="ts">
	import { spring } from 'svelte/motion';

	import Galleries from './photos/Galleries.svelte';

	let L0 = 'img/layers/L0.svg';
	let L1 = 'img/layers/L1.svg';
	let L2 = 'img/layers/L2.svg';
	let L3 = 'img/layers/L3.svg';
	let L4 = 'img/layers/L4.svg';
	let BG = 'img/layers/L5.jpg';
	const layers = [BG, L4, L3, L2, L1, L0];
	const layerFactors = layers.map((__, index) => {
		// layers are spaced according to this 1/5-root function
		// with faraway layers closer together than nearby layers
		const layerSpeed = Math.pow(index / (layers.length - 1), 1.5);
		// Layer speeds are spaced between 0.2 and 1
		const mappedlayerSpeed = 0.2 + layerSpeed * 0.8;
		return mappedlayerSpeed;
	});

	let scrollY: number;
	let coords = spring({ y: 0 }, { stiffness: 0.2, damping: 1 });
	$: coords.set({ y: scrollY });
</script>

<svelte:window bind:scrollY />

<section class="anti-main parallax-container">
	{#each layers as layer, layerIndex}
		{#if layerIndex === 0}
			<!-- first layer fixed to 0,0 -->
			<div style="background-image: url({layer});" />
		{:else if layerIndex !== layers.length - 1}
			<!-- middle layers managed by spring -->
			<div
				style="
          background-image: url({layer});
          transform: translate3d(0,{-$coords.y * layerFactors[layerIndex]}px,0);
        "
			/>
		{:else}
			<!-- last layer absolutely attached to scroll -->
			<div style="background-image: url({layer}); position: absolute;" />
		{/if}
	{/each}
</section>

<div class="anti-main content">
	<section class="main layout-container">
		<h1>The Adventures of Kristin & Darius</h1>
		<h2>Photos</h2>
		<Galleries />
	</section>
</div>

<style>
	:global(html) {
		--ssr-color: var(--c1);
		background-color: rgb(var(--ssr-color));
	}

	.parallax-container {
		/*
    We don't want the container to go
    all the way to the top of the page;
    only to the top of the box shadow in the nav bar
    */
		--gap: 1rem;
		margin-top: calc(-1 * var(--gap));

		--layer-height: calc(100vh - var(--nav-height) + var(--gap));
		--layer-min-height: 70vw;
		--layer-max-height: 160vw;

		height: var(--layer-height);
		min-height: var(--layer-min-height);
		max-height: var(--layer-max-height);
		background-color: rgb(var(--c1));

		position: relative;
	}

	.parallax-container div {
		position: fixed;

		height: var(--layer-height);
		min-height: var(--layer-min-height);
		max-height: var(--layer-max-height);

		background-position: bottom center;
		background-size: cover;
		background-repeat: no-repeat;
		width: 100%;

		will-change: transform;
	}

	.content {
		position: relative;
		min-height: calc(100vh - var(--gap-2) - var(--nav-height));

		padding-top: var(--gap);

		/*
    We use negative margins to show
    the background color around the content
     */
		background-color: rgb(var(--background-color, var(--ssr-color)));
		/*
    And to make sure we have some room at the bottom
    */
		padding-bottom: var(--nav-height);
		margin-bottom: calc(-1 * var(--nav-height));
	}

	.content h1 {
		margin-top: 0;
	}
</style>
