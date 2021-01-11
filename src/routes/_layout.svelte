<script lang="ts">
  import Nav from "../components/Nav.svelte";
  import LayoutBackgroundColor from "../components/LayoutBackgroundColor.svelte";
  import LayoutTransitionContainer from "../components/LayoutTransitionContainer.svelte";

  export let segment: string;

  const transitionDuration = 500;
</script>

<style>
  :global(:root) {
    --gap: 1.4rem;
    --gap-half: calc(var(--gap) / 2);
    --gap-2: calc(var(--gap) * 2);

    --content-width: 40rem;

    --c1: 39, 36, 66;
    --c2: 55, 50, 93;
    --c3: 71, 64, 119;
    --c4: 87, 79, 146;
    --c5: 105, 96, 169;
    --cx: 241, 181, 125;
  }

  :global(html, body) {
    margin: 0;
    padding: 0;
  }

  :global(body) {
    font-family: "Courier Prime", monospace;
    color: white;
  }
</style>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital@0;1&display=swap"
    rel="stylesheet" />
</svelte:head>

<LayoutBackgroundColor {segment} {transitionDuration} />
<Nav {segment} />
<LayoutTransitionContainer {segment} {transitionDuration}>
  <slot />
</LayoutTransitionContainer>
