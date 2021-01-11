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
  form button[type="submit"] {
    grid-column: span 2;
    padding: 0.7rem;
  }
  form * {
    font: inherit;
  }
</style>

<form name="subscribe" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="subscribe" />
  <label for="name">Your Name</label><input type="text" name="name" />

  <label for="email">Your Email</label><input type="email" name="email" />

  <label for="scifi">Star&nbsp;Wars or Star&nbsp;Trek? </label>
  <select name="scifi">
    <option disabled selected value hidden>Choose Wisely...</option>
    <option value="starwars">Star Wars</option>
    <option value="startrek">Star Trek</option>
  </select>
  <button type="submit">Subscribe</button>
</form>
