<script lang="ts">
  export let href: string | undefined = undefined;
  export let disabled = false;
</script>

{#if typeof href === "undefined" || disabled}
  <button class:disabled {disabled} {...$$props}>
    <slot />
  </button>
{:else}
  <a class:disabled {...$$props} {href}>
    <slot />
  </a>
{/if}

<style>
  a,
  button {
    --color: white;
    padding: var(--gap-05);
    background: none;
    cursor: pointer;
    border: var(--border) solid var(--color);
    color: inherit;
    font-family: inherit;
    font-size: 1em;
    line-height: inherit;

    -webkit-appearance: none;
    -moz-appearance: none;

    display: inline-block;
    position: relative;
    z-index: 1;

    color: var(--color);
    text-decoration: none;
    transition: color var(--transition-duration);
  }

  .disabled {
    cursor: auto;
    border-style: dotted;
    /* --color: rgba(255, 255, 255, 0.8); */
  }

  a:not(.disabled):after {
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

  a:not(.disabled):hover,
  button:not(.disabled):hover {
    color: rgb(var(--c1));
  }
  a:not(.disabled):hover:before,
  button:not(.disabled):hover:before {
    transform: scaleX(1);
  }
</style>
