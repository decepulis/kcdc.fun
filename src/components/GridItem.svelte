<li>
  <slot />
</li>

<style>
  li {
    border: var(--border) solid white;
    padding: var(--gap);
    max-width: var(--content-width);

    display: flex;
    flex-direction: column;
  }

  li > :global(*:first-child) {
    margin-top: 0;
  }
  li > :global(*:last-child) {
    margin-bottom: 0;
  }
</style>
