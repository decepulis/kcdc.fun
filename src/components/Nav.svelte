<script lang="ts">
  export let segment: string;
</script>

<style>
  :global(:root) {
    --nav-height: calc(1rem + var(--gap-2));
  }

  nav {
    padding: 0 var(--gap-half);

    position: fixed;
    top: 0;
    width: 100%;

    /*
    We use a negative margin trick
    to open up space at the bottom of the nav
    for the drop shadow to be without clipping
    */
    margin-bottom: calc(-1 * var(--gap-2));
    padding-bottom: var(--gap-2);

    z-index: 1000;

    overflow-x: scroll;
    overflow-y: hidden;
    scrollbar-width: thin;
  }
  nav::before {
    /* 
    Background and gradient for nav:
    We do it here in a fixed :before so that the box shadow 
    could exist inside the nav where we visually want it...
    without any of the weird css behavior that comes in
    when horizontal scroll happens
    */
    content: "";
    position: fixed;
    width: 100vw;
    height: calc(var(--nav-height) - var(--gap));
    left: 0;
    top: 0;
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

    display: flex;
  }
  ul::before,
  ul:after {
    /* 
    Here's little gradients at the left and right side of the nav
    that indicate there's more to scroll
    */
    content: "";
    position: fixed;
    z-index: 1001;
    height: calc(var(--nav-height) - var(--gap) + 2px);
    width: var(--gap);
    top: 0;
    /* 
    Of course, once again, we need to use shadows instead of gradients
    because we can't transition gradients but we can shadows
    */
    box-shadow: 0 0 var(--gap-half) var(--gap-half) rgb(var(--background-color));
    transition: box-shadow var(--page-transition-duration) ease-in-out;
  }
  ul::before {
    left: calc(-1 * var(--gap));
  }
  ul::after {
    right: calc(-1 * var(--gap));
  }

  li {
    display: block;
  }

  a {
    display: block;
    position: relative;
    text-decoration: none;
    color: white;
    opacity: 0.7;
    transition: opacity var(--transition-duration);
    padding-bottom: 2px;

    padding: var(--gap) var(--gap-half);
    /* increase tap target size */
    margin-bottom: calc(-1 * var(--gap));
  }

  a::after {
    position: absolute;
    content: "";
    width: calc(100% - var(--gap));
    height: 2px;
    background-color: rgb(var(--cx));
    display: block;
    bottom: var(--gap);
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
