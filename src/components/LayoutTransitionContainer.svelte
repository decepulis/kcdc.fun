<!-- 
	Transitions between segments
	Scrolls to top in middle of transition
	Establishes grid
-->
<script lang="ts">
	import { scale } from "svelte/transition";
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
		min-height: 100vh;

		min-width: var(--min-page-width);
		display: grid;
		align-content: start;
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
		in:scale={{ duration: halfDuration, delay: halfDuration + transitionWiggleRoom, start: 0.99 }}
		out:scale={{ duration: halfDuration, start: 0.99 }}
		on:outroend={scrollToTop}>
		<slot />
	</main>
{/key}
