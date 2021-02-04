<li>
  <slot />
</li>

<style>
  li {
    display: flex;
    flex-direction: column;
  }

  li > :global(h1),
  li > :global(h2),
  li > :global(h3),
  li > :global(h4),
  li > :global(h5),
  li > :global(h6) {
    text-align: center;
  }

  li > :global(footer) {
    text-align: center;
  }
</style>
