<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style>
  :global(html, body) {
    font-family: "Comic Sans MS", serif;
    background-color: blue;
    color: yellow;
    text-align: center;
  }
  main {
    min-width: 300px;
    max-width: 500px;
    padding: 0 1rem;
    margin: 0 auto;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
