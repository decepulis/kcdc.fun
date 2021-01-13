<script lang="ts">
  export let segment: string;
</script>

<style>
  nav {
    padding: 0 var(--gap-half);

    position: fixed;
    top: 0;
    width: 100%;

    z-index: 1000;

    overflow-x: scroll;

    /* background color stops just under text */
    background-color: rgb(var(--background-color));
    /* gradient under text handled by shadow */
    box-shadow: 0 0 var(--gap) var(--gap) rgb(var(--background-color));
    transition: background-color var(--page-transition-duration) ease-in-out,
      box-shadow var(--page-transition-duration) ease-in-out;
  }

  ul {
    margin: 0;
    padding: 0;

    white-space: nowrap;
  }

  li {
    display: inline-block;
  }

  a {
    display: block;
    position: relative;
    text-decoration: none;
    padding: var(--gap) var(--gap-half) 0;
    color: white;
    opacity: 0.7;
    transition: opacity var(--transition-duration);
    padding-bottom: 2px;
  }

  a::after {
    position: absolute;
    content: "";
    width: calc(100% - var(--gap));
    height: 2px;
    background-color: rgb(var(--cx));
    display: block;
    bottom: 0;
    opacity: 0;
    transition: opacity var(--transition-duration);
  }

  a:hover {
    opacity: 0.85;
  }
  a:hover::after {
    opacity: 0.85;
  }

  a[aria-current] {
    opacity: 1;
  }
  a[aria-current]::after {
    opacity: 1;
  }

  :global(:root) {
    --nav-height: calc(1rem + var(--gap-2));
  }
</style>

<nav>
  <ul>
    <li>
      <a
        aria-current={segment === undefined ? 'page' : undefined}
        sapper:noscroll
        rel="prefetch"
        style="font-style:italic;"
        href=".">kcdc</a>
    </li>
    <li>
      <a
        aria-current={segment === 'rsvp' ? 'page' : undefined}
        sapper:noscroll
        rel="prefetch"
        href="rsvp">rsvp</a>
    </li>
    <li>
      <a
        aria-current={segment === 'venue' ? 'page' : undefined}
        sapper:noscroll
        rel="prefetch"
        href="venue">venue</a>
    </li>
    <li>
      <a
        aria-current={segment === 'hotels' ? 'page' : undefined}
        sapper:noscroll
        rel="prefetch"
        href="hotels">hotels</a>
    </li>
    <li>
      <a
        aria-current={segment === 'registry' ? 'page' : undefined}
        sapper:noscroll
        rel="prefetch"
        href="registry">registry</a>
    </li>
  </ul>
</nav>
