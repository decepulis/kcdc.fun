<script lang="ts">
  export let wider: boolean;
</script>

<ul class:wider>
  <slot />
</ul>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0 var(--gap);
    grid-column: fullpage-start / fullpage-end;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  ul > :global(*) {
    flex: 1;
    padding: 0 var(--gap);
    min-width: calc(var(--content-width) / 2);
    max-width: var(--content-width);
  }
</style>
