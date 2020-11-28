<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
  }
  main {
    min-width: 375px;
  }
</style>

<!-- <Nav {segment} /> -->

<main>
  <slot />
</main>
