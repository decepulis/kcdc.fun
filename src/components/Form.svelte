<form {...$$props}>
  <slot />
</form>

<style>
  form {
    width: 100%;
    margin: 0 auto;

    display: grid;
    grid-template-columns: 150px 1fr;

    gap: var(--gap);

    align-items: center;

    text-align: left;
  }
  @media (max-width: 500px) {
    form {
      text-align: center;
      grid-template-columns: 1fr;
    }
  }

  :global(form input),
  :global(form label),
  :global(form select) {
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  :global(form [type="text"]),
  :global(form select) {
    background: none;
    appearance: none;
    padding: var(--gap-05);
    border: var(--border) solid white;
    border-radius: 0;
  }

  :global(form [type="radio"]) {
    opacity: 0;
    position: absolute;
    left: -100vw;
  }
  :global(form [type="radio"]:focus + label) {
    outline-style: solid;
  }
  :global(form [type="radio"] + label) {
    padding-left: calc(1em + var(--gap));
    position: relative;
  }
  :global(form [type="radio"] + label:before),
  :global(form [type="radio"] + label:after) {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 1em;
    width: 1em;
    border-radius: 50%;
  }
  :global(form [type="radio"] + label:after) {
    border: var(--border) solid white;
  }
  :global(form [type="radio"]:checked + label:before) {
    background-color: rgb(var(--cx));
    border: calc(2 * var(--border)) solid
      rgb(var(--background-color, var(--ssr-color)));
  }

  :global(form select) {
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }

  :global(form .span-2) {
    grid-column: span 2;
  }
  @media (max-width: 500px) {
    :global(form .span-2) {
      grid-column: auto;
    }
  }

  :global(form *) {
    font: inherit;
  }
</style>
