<script lang="ts">
	import type { LayoutData } from '.svelte-kit/types/src/routes/$types';

	import '../app.css';
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
	@supports (padding: max(1rem, env(safe-area-inset-left))) {
		main {
			padding: 0 max(1rem, env(safe-area-inset-left)) max(1rem, env(safe-area-inset-bottom))
				max(1rem, env(safe-area-inset-right));
		}
	}
</style>
