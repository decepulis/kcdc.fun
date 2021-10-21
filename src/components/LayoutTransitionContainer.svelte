<!--
	Transitions between segments
	Scrolls to top in middle of transition
	Establishes grid
-->
<script lang="ts">
	import { fade } from 'svelte/transition';
	export let path = '';
	export let pageTransitionDuration: number;

	const halfDuration = pageTransitionDuration / 2;

	let y: number;
	const scrollToTop = () => {
		y = 0;
	};
</script>

<svelte:window bind:scrollY={y} />

{#key path}
	<main
		in:fade={{ duration: halfDuration, delay: halfDuration }}
		out:fade={{ duration: halfDuration }}
		on:outroend={scrollToTop}
	>
		<slot />
	</main>
{/key}

<style>
	main {
		padding: var(--nav-height) 0;
		padding: var(--nav-height) 0 max(var(--nav-height), env(safe-area-inset-bottom));
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

		/* iOS */
		grid-template-columns:
			[fullpage-start]
			minmax(max(env(safe-area-inset-left), var(--gap)), 1fr)
			[main-start]
			minmax(0, var(--content-width))
			[main-end]
			minmax(max(env(safe-area-inset-right), var(--gap)), 1fr)
			[fullpage-end];
	}

	main > :global(*) {
		grid-column: main-start / main-end;
	}
</style>
