<script>
  import underconstruction from "./_underconstruction.gif";
</script>

<svelte:head>
  <title>Kristin & Darius</title>
</svelte:head>

<h1>Kristin and Darius are finally getting married!</h1>
<p>Watch this space for updates.</p>
<p>
  <img
    src={underconstruction}
    alt="This site is under construction"
    width="300" />
</p>
<h2>Can't Wait to Hear The Latest?</h2>
<p><i>Subscribe to our newsletter!</i></p>
<form name="subscribe" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="subscribe" />
  <p><label>Your Name: <input type="text" name="name" /></label></p>
  <p><label>Your Email: <input type="email" name="email" /></label></p>
  <p>
    <label>
      Star Wars or Star Trek?:
      <select name="scifi">
        <option disabled selected value hidden>Choose Wisely...</option>
        <option value="starwars">Star Wars</option>
        <option value="startrek">Star Trek</option>
      </select>
    </label>
  </p>
  <p><button type="submit">Subscribe</button></p>
</form>
