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
	import LayoutTypeSystem from '../components/LayoutTypeSystem.svelte';
	import LayoutTransitionContainer from '../components/LayoutTransitionContainer.svelte';
	import LayoutGlobalStyles from '../components/LayoutGlobalStyles.svelte';

	export let path: string;

	const pageTransitionDuration = 250;
</script>

<LayoutGlobalStyles />

<LayoutTypeSystem />
<LayoutBackgroundColor {path} {pageTransitionDuration} />

<Nav {path} />
<LayoutTransitionContainer {path} {pageTransitionDuration}>
	<slot />
</LayoutTransitionContainer>
