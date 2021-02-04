<li>
  <slot />
</li>

<style>
  li {
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
