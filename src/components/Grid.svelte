<ul>
  <slot />
</ul>

<style>
  ul {
    list-style-type: none;
    margin: var(--gap) 0;
    padding: 0 var(--gap);
    grid-column: fullpage-start / fullpage-end;

    display: grid;
    gap: var(--gap);
    grid-template-columns: repeat(
      auto-fit,
      minmax(var(--content-width-05), max-content)
    );
    justify-content: center;
  }
</style>
