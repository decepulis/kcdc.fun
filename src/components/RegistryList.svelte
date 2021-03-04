<script lang="ts">
  export let smol: boolean;
</script>

<ul class:smol>
  <slot />
</ul>

<style>
  ul {
    list-style-type: none;
    margin: 0 auto;
    padding: 0 var(--gap);
    grid-column: fullpage-start / fullpage-end;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  ul > :global(*) {
    flex: 1;
    padding: 0 var(--gap);
    min-width: calc(var(--content-width) / 2 - var(--gap-2));
    max-width: var(--content-width);
  }
  ul.smol > :global(*) {
    min-width: calc(var(--content-width) / 3.5);
  }
</style>
