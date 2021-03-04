<style>
  /* -- Variables -- */
  :global(:root) {
    --gap: 1rem;
    --gap-05: calc(var(--gap) * 0.5);
    --gap-075: calc(var(--gap) * 0.75);
    --gap-2: calc(var(--gap) * 2);
    --gap-15: calc(var(--gap) * 1.5);
    --gap-3: calc(var(--gap) * 3);
    --gap-4: calc(var(--gap) * 4);

    --border: 2px;

    --content-width: 40rem;
    --content-width-05: calc(var(--content-width) / 2);
    --min-page-width: 320px;

    --c1: 39, 36, 66;
    --c2: 55, 50, 93;
    --c3: 71, 64, 119;
    --c4: 87, 79, 146;
    --c5: 105, 96, 169;
    --cx: 241, 181, 125;

    --transition-duration: 150ms;
  }

  /* -- Spacing -- */
  :global(html, body) {
    margin: 0;
    padding: 0;
  }
  :global(html) {
    box-sizing: border-box;
  }
  :global(*, *:before, *:after) {
    box-sizing: inherit;
  }

  /* -- Appearance -- */
  :global(*, *:before, *:after) {
    outline-color: rgb(var(--cx));
  }
  :global(*::selection) {
    background: rgba(var(--cx), 0.8);
    color: rgba(var(--c1), 1);
  }

  /* -- Utilities -- */
  :global(.visually-hidden) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  :global(.d-none) {
    display: none !important;
  }

  :global(.float-right) {
    float: right;
  }
  :global(.float-left) {
    float: left;
  }

  :global(.p-img) {
    height: 100px;
    width: auto;
    padding-left: var(--gap);
    padding-right: var(--gap);
    margin-bottom: var(--gap);
  }
  :global(.p-img-150) {
    height: 150px;
  }
  :global(.p-img-200) {
    height: 200px;
  }

  @media (max-width: 42rem) {
    :global(.p-img) {
      float: none;
      display: block;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
  }
</style>
