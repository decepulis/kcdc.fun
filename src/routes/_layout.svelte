<script lang="ts">
  import Nav from "../components/Nav.svelte";
  export let segment: string;
</script>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;

    font-family: "Courier Prime", monospace;
  }
  main {
    min-width: 320px;
  }
</style>

<!-- <Nav {segment} /> -->

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital@0;1&display=swap"
    rel="stylesheet" />
</svelte:head>

<main>
  <slot />
</main>
