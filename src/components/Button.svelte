<script lang="ts">
  export let href: string | undefined = undefined;
</script>

{#if typeof href === "undefined"}
  <button {...$$props}>
    <slot />
  </button>
{:else}
  <a {...$$props} {href}>
    <slot />
  </a>
{/if}

<style>
  a,
  button {
    padding: var(--gap-05);
    background: none;
    cursor: pointer;
    border: var(--border) solid white;
    color: inherit;
    font-family: inherit;

    -webkit-appearance: none;
    -moz-appearance: none;

    display: inline-block;
    position: relative;
    z-index: 1;

    color: white;
    text-decoration: none;
    transition: color var(--transition-duration);
  }

  a:after {
    content: " \203A";
  }

  a:before,
  button:before {
    all: unset;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: rgba(var(--cx), 0.9);
    transform: scaleX(0);
    transform-origin: 0 0;
    transition: transform var(--transition-duration);
  }

  a:hover,
  button:hover {
    color: rgb(var(--c1));
  }
  a:hover:before,
  button:hover:before {
    transform: scaleX(1);
  }
</style>
