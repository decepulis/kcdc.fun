<!-- 
	Transitions between segments
	Scrolls to top in middle of transition
	Establishes grid
-->
<script lang="ts">
	import { fade } from "svelte/transition";
	export let segment: string;
	export let pageTransitionDuration: number;

	const transitionWiggleRoom = 0;
	const halfDuration = pageTransitionDuration / 2 - transitionWiggleRoom / 2;

	let y: number;
	const scrollToTop = () => {
		y = 0;
	};
</script>

<style>
	main {
		padding-top: var(--nav-height);

		min-width: var(--min-page-width);
		display: grid;
		grid-template-columns:
			[fullpage-start]
			minmax(var(--gap), 1fr)
			[main-start]
			minmax(0, var(--content-width))
			[main-end]
			minmax(var(--gap), 1fr)
			[fullpage-end];
	}

	main > :global(*) {
		grid-column: main-start / main-end;
	}
</style>

<svelte:window bind:scrollY={y} />
{#key segment}
	<main
		in:fade={{ duration: halfDuration, delay: halfDuration + transitionWiggleRoom }}
		out:fade={{ duration: halfDuration }}
		on:outroend={scrollToTop}>
		<slot />
	</main>
{/key}
