<style>
  :global(html) {
    font-size: 100%;
  }

  :global(body) {
    font-family: "Courier Prime", monospace;
    font-weight: 400;
    line-height: 1.75;
    color: #ffffff;
  }
  :global(a) {
    color: inherit;
    text-decoration-style: solid;
    /* text-decoration-color: rgb(var(--cx)); */
    /* text-decoration-thickness: var(--border); */
  }
  :global(a:hover) {
    text-decoration-style: wavy;
  }

  :global(*) {
    /*
    Our layout is defined using a CSS grid approach
    https://www.joshwcomeau.com/css/full-bleed/
    which unfortunately disables margin collapsing.
    In order to ensure consistent behavior, therefore,
    we enforce one-way margin flow.
    E.g., by default, we only use margin bottom.
    */
    margin-top: 0;
  }

  :global(p, ul) {
    margin-bottom: var(--gap);
  }
  :global(li) {
    margin-bottom: var(--gap-05);
  }

  :global(h1),
  :global(h2),
  :global(h3),
  :global(h4),
  :global(h5) {
    /*
    In defiance of our one-way margin flow described earlier,
    we stick a margin-top on our headers, as they usually break sections.
    */
    margin: 2rem 0 1.38rem;
    font-family: "Courier Prime", monospace;
    font-weight: 400;
    line-height: 1.3;
  }

  :global(h1),
  :global(.h1) {
    font-size: 2.488rem;
  }

  :global(h2),
  :global(.h2) {
    font-size: 2.441rem;
  }

  :global(h3),
  :global(.h3) {
    font-size: 1.953rem;
    font-style: italic;
  }

  :global(h4),
  :global(.h4) {
    font-size: 1.563rem;
  }

  :global(h5),
  :global(.h5) {
    font-size: 1.25rem;
  }

  :global(small),
  :global(.text_small) {
    font-size: 0.8rem;
  }
  @media (max-width: 42rem) {
    :global(h1) {
      margin-top: 0;
      font-size: 1.802rem;
    }

    :global(h2) {
      font-size: 1.602rem;
    }

    :global(h3) {
      font-size: 1.424rem;
    }

    :global(h4) {
      font-size: 1.266rem;
    }

    :global(h5) {
      font-size: 1.125rem;
    }

    :global(small),
    :global(.text_small) {
      font-size: 0.889rem;
    }
  }
</style>
