<script lang="ts">
  import { spring } from "svelte/motion";

  import SubscribeForm from "../components/SubscribeForm.svelte";

  let L0 = "img/L0.svg";
  let L1 = "img/L1.svg";
  let L2 = "img/L2.svg";
  let L3 = "img/L3.svg";
  let L4 = "img/L4.svg";
  let BG = "img/L5.png";
  const layers = [BG, L4, L3, L2, L1, L0];

  let scrollY: number;
  let coords = spring({ y: 0 }, { stiffness: 0.2, damping: 1 });
  $: coords.set({ y: scrollY });
</script>

<style>
  .parallax-container {
    height: 100vh;
    min-height: 75vw;
    max-height: 160vw;
    background-color: var(--c1);

    margin-top: calc(-1 * var(--nav-height));
    padding-bottom: var(--nav-height);
  }

  .parallax-container:after {
    /* 
    fill the padding bottom with background color
    to fix the 3.8rem we opened up for the nav bar
    */
    content: "";
    position: absolute;
    width: 100%;
    height: calc(1.05 * var(--nav-height));
    bottom: calc(-1.05 * var(--nav-height));
    left: 0;
    background-color: var(--c1);
  }

  .parallax-container div {
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

  .content {
    position: relative;
    padding: var(--gap);

    text-align: center;
    min-height: calc(100vh - var(--gap-2) - 50px);

    background-color: var(--c1);
  }

  .content h1 {
    margin-top: 0;
  }
</style>

<svelte:head>
  <title>Kristin & Darius</title>
</svelte:head>

<svelte:window bind:scrollY />

<div class="parallax-container">
  {#each layers as layer, layerIndex}
    {#if layerIndex === 0}
      <!-- first layer fixed to 0,0 -->
      <div style="background-image: url({layer});" />
    {:else if layerIndex !== layers.length - 1}
      <!-- middle layers managed by spring -->
      <div
        style="
          background-image: url({layer});
          transform: translate3d(0,{(-$coords.y * layerIndex) / (layers.length - 1)}px,0)
        " />
    {:else}
      <!-- last layer absolutely attached to scroll -->
      <div style="background-image: url({layer}); position: absolute;" />
    {/if}
  {/each}
</div>

<section class="content">
  <h1>Kristin and Darius are getting married!</h1>
  <p><i>Watch this space for updates.</i></p>
  <h2>Can't wait to hear the latest?</h2>

  <SubscribeForm />
</section>
