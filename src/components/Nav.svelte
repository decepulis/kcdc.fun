<script lang="ts">
  export let segment: string;
</script>

<style>
  nav {
    padding: 0 var(--gap);
    position: sticky;
    top: 0;
    z-index: 1000;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
    color: white;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - var(--gap));
    height: 2px;
    background-color: var(--cx);
    display: block;
    bottom: calc(var(--gap) - 2px);
  }

  a {
    color: inherit;
    text-decoration: none;
    padding: var(--gap) var(--gap-half);
    display: block;
    color: rgba(255, 255, 255, 0.8);
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
        href=".">home</a>
    </li>
    <li>
      <a
        aria-current={segment === 'venue' ? 'page' : undefined}
        href="venue">venue</a>
    </li>
    <li>
      <a
        aria-current={segment === 'hotels' ? 'page' : undefined}
        href="hotels">hotels</a>
    </li>
    <li>
      <a
        aria-current={segment === 'registry' ? 'page' : undefined}
        href="registry">registry</a>
    </li>
  </ul>
</nav>
