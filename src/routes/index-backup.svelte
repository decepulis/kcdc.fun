<script>
  let L0 = "img/L0.png";
  let L1 = "img/L1.png";
  let L2 = "img/L2.png";
  let L3 = "img/L3.png";
  let L4 = "img/L4.png";
  let L5 = "img/L5.png";
  const layers = [L5, L4, L3, L2, L1, L0];

  let y;
</script>

<!--  -->
<style>
  .parallax-container {
    height: 100vh;
    background-color: #272442;
  }

  .parallax-layer {
    position: fixed;

    height: 100vh;

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
    top: 0;
    padding-top: 5vh;
    min-height: 120vh;
  }
  .content h2 {
    margin-top: 0;
  }

  .y {
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    top: 100px;
    color: white;
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

<div class="y">{y}</div>

<section class="content">
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
</section>
