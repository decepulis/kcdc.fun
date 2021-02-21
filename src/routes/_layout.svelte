<script lang="ts">
  import Nav from "../components/Nav.svelte";
  import LayoutBackgroundColor from "../components/LayoutBackgroundColor.svelte";
  import LayoutTypeSystem from "../components/LayoutTypeSystem.svelte";
  import LayoutTransitionContainer from "../components/LayoutTransitionContainer.svelte";
  import LayoutGlobalStyles from "../components/LayoutGlobalStyles.svelte";

  export let segment: string;

  const pageTransitionDuration = 450;
</script>

<LayoutGlobalStyles />

<LayoutTypeSystem />
<LayoutBackgroundColor {segment} {pageTransitionDuration} />

<Nav {segment} />
<LayoutTransitionContainer {segment} {pageTransitionDuration}>
  <slot />
</LayoutTransitionContainer>
