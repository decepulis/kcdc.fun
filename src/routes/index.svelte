<script>
  let L0 = "img/L0.svg";
  let L1 = "img/L1.svg";
  let L2 = "img/L2.svg";
  let L3 = "img/L3.svg";
  let L4 = "img/L4.svg";
  let L5 = "img/L5.png";
  const layers = [L5, L4, L3, L2, L1, L0];

  let y;
</script>

<!--  -->
<style>
  .parallax-container {
    height: 100vh;
    min-height: 75vw;
    max-height: 160vw;
    background-color: #272442;
  }

  .parallax-layer {
    position: fixed;

    height: 100vh;
    min-height: 75vw;
    max-height: 160vw;

    background-position: bottom center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;

    will-change: transform;
  }

  :global(body),
  .content {
    background-color: #272442;
    color: white;
  }

  .content {
    position: relative;
    padding: 1.4rem;

    text-align: center;
    min-height: calc(100vh - 2.8rem);
  }

  .content h1 {
    margin-top: 0;
  }

  .content:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2rem;
    top: -2rem;
    left: 0;
    background-color: #272442;
  }

  form[name="subscribe"] {
    max-width: 500px;
    margin: 0 auto;

    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 1.4rem;
    grid-gap: 1.4rem;
    text-align: left;
  }
  @media (max-width: 500px) {
    form[name="subscribe"] {
      text-align: center;
      gap: 0.7rem;
      grid-gap: 0.7rem;
    }
    form[name="subscribe"] label,
    form[name="subscribe"] input,
    form[name="subscribe"] select {
      grid-column: span 2;
    }
  }
  form[name="subscribe"] button[type="submit"] {
    grid-column: span 2;
    padding: 0.7rem;
  }
  form[name="subscribe"] * {
    font: inherit;
  }
</style>

<svelte:head>
  <title>Kristin & Darius</title>
</svelte:head>

<svelte:window bind:scrollY={y} />

<div class="parallax-container">
  {#each layers as layer, layerIndex}
    <div
      class="parallax-layer"
      alt="parallax layer {layerIndex}"
      style="
      background-image: url({layer});
      transform: translate3d(0,{(-y * layerIndex) / (layers.length - 1)}px, 0)
      " />
  {/each}
</div>

<section class="content">
  <h1>Kristin and Darius are getting married!</h1>
  <p><i>Watch this space for updates.</i></p>
  <h2>Can't wait to hear the latest?</h2>

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
</section>
