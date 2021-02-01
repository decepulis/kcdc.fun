<script>
  import Button from "./Button.svelte";
</script>

<form id="subscribe" name="subscribe" method="POST" data-netlify="true">
  <input type="hidden" id="formname" name="formname" value="subscribe" />
  <label for="subscribe-name">Your Name</label>
  <input type="text" id="subscribe-name" name="name" />

  <label for="subscribe-email">Your Email</label>
  <input type="email" id="subscribe-cemail" name="email" />

  <label for="subscribe-scifi">Star&nbsp;Wars or Star&nbsp;Trek? </label>
  <select id="subscribe-scifi" name="scifi">
    <option disabled selected value hidden>Choose Wisely...</option>
    <option value="starwars">Star Wars</option>
    <option value="startrek">Star Trek</option>
  </select>
  <Button type="submit">Subscribe</Button>
</form>

<style>
  form {
    max-width: var(--content-width);
    margin: 0 auto;

    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 1.4rem;
    grid-gap: 1.4rem;
    text-align: left;
  }

  form input,
  form select {
    background: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: var(--gap-05);
    border: var(--border) solid white;
    border-radius: 0;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  form select {
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
  @media (max-width: 500px) {
    form {
      text-align: center;
      gap: 0.7rem;
      grid-gap: 0.7rem;
    }
    form label,
    form input,
    form select {
      grid-column: span 2;
    }
  }
  form > :global(button[type="submit"]) {
    grid-column: span 2;
  }
  form * {
    font: inherit;
  }
</style>
