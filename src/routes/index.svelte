<script>
  import {
    initialize as initParallax,
    clear as clearParallax,
  } from "../components/smoothParallax";

  import { onMount } from "svelte";

  import SubscribeForm from "../components/SubscribeForm.svelte";

  let L0 = "img/L0.svg";
  let L1 = "img/L1.svg";
  let L2 = "img/L2.svg";
  let L3 = "img/L3.svg";
  let L4 = "img/L4.svg";
  let BG = "img/L5.png";
  const layers = [BG, L4, L3, L2, L1, L0];

  onMount(() => {
    initParallax(".parallax-layer");
    return clearParallax;
  });
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
</style>

<svelte:head>
  <title>Kristin & Darius</title>
</svelte:head>

<div class="parallax-container">
  {#each layers as layer, layerIndex}
    <div
      class="parallax-layer"
      alt="parallax layer {layerIndex}"
      style="background-image: url({layer});" />
  {/each}
</div>

<section class="content">
  <h1>Kristin and Darius are getting married!</h1>
  <p><i>Watch this space for updates.</i></p>
  <h2>Can't wait to hear the latest?</h2>

  <SubscribeForm />
</section>
