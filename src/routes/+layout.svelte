<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import Nav from './Nav.svelte';

	export let data: LayoutData;
</script>

<Nav galleries={data.galleries} />
<main>
	<slot />
</main>

<style>
	main {
		padding: 0 1rem;
	}
	main :global(.anti-main) {
		margin-left: -1rem;
		margin-right: -1rem;
	}
	@supports (padding: max(1rem, env(safe-area-inset-left))) {
		main {
			padding: 0 max(1rem, env(safe-area-inset-left)) max(1rem, env(safe-area-inset-bottom))
				max(1rem, env(safe-area-inset-right));
		}
		main :global(.anti-main) {
			margin-left: calc(-1 * max(1rem, env(safe-area-inset-left)));
			margin-right: calc(-1 * max(1rem, env(safe-area-inset-right)));
		}
	}
</style>
