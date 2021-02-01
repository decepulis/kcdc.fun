<script lang="ts">
  import Nav from "../components/Nav.svelte";
  import LayoutBackgroundColor from "../components/LayoutBackgroundColor.svelte";
  import LayoutTypeSystem from "../components/LayoutTypeSystem.svelte";
  import LayoutTransitionContainer from "../components/LayoutTransitionContainer.svelte";

  export let segment: string;

  const pageTransitionDuration = 450;
</script>

<LayoutTypeSystem />

<LayoutBackgroundColor {segment} {pageTransitionDuration} />
<Nav {segment} />
<LayoutTransitionContainer {segment} {pageTransitionDuration}>
  <slot />
</LayoutTransitionContainer>

<style>
  :global(:root) {
    --gap: 1rem;
    --gap-05: calc(var(--gap) * 0.5);
    --gap-075: calc(var(--gap) * 0.75);
    --gap-2: calc(var(--gap) * 2);
    --gap-15: calc(var(--gap) * 1.5);
    --gap-3: calc(var(--gap) * 3);

    --border: 2px;

    --content-width: 40rem;
    --content-width-05: calc(var(--content-width) / 2);
    --min-page-width: 320px;

    --c1: 39, 36, 66;
    --c2: 55, 50, 93;
    --c3: 71, 64, 119;
    --c4: 87, 79, 146;
    --c5: 105, 96, 169;
    --cx: 241, 181, 125;

    --transition-duration: 150ms;
  }

  :global(html, body) {
    margin: 0;
    padding: 0;
  }

  :global(html) {
    background-color: rgb(var(--c1));
    box-sizing: border-box;
  }

  :global(*, *:before, *:after) {
    box-sizing: inherit;
    outline-color: rgb(var(--cx));
  }
  :global(*::selection) {
    background: rgba(var(--cx), 0.8);
    color: rgba(var(--c1), 1);
  }
</style>
