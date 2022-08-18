<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	import Nav from './Nav.svelte';
</script>

<Nav path={$page.url.pathname} />
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
