<script context="module">
	// https://dev.to/evanwinter/page-transitions-with-svelte-kit-35o6
	export const load = async ({ page }) => ({
		props: {
			path: page.path
		}
	});
</script>

<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import LayoutBackgroundColor from '../components/LayoutBackgroundColor.svelte';
	import LayoutTransitionContainer from '../components/LayoutTransitionContainer.svelte';

	import '../components/LayoutTypeSystem.css';
	import '../components/LayoutGlobalStyles.css';

	export let path: string;

	const pageTransitionDuration = 250;
</script>

<LayoutBackgroundColor {path} {pageTransitionDuration} />

<Nav {path} />
<LayoutTransitionContainer {path} {pageTransitionDuration}>
	<slot />
</LayoutTransitionContainer>
