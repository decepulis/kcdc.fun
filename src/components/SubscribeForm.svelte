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
    border: var(--border) solid white;
    color: inherit;
    font: inherit;
    cursor: pointer;
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
