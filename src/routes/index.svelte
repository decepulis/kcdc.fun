<script lang="ts">
  import { spring } from "svelte/motion";

  import SubscribeForm from "../components/SubscribeForm.svelte";

  let L0 = "img/layers/L0.svg";
  let L1 = "img/layers/L1.svg";
  let L2 = "img/layers/L2.svg";
  let L3 = "img/layers/L3.svg";
  let L4 = "img/layers/L4.svg";
  let BG = "img/layers/L5.png";
  const layers = [BG, L4, L3, L2, L1, L0];

  let scrollY: number;
  let coords = spring({ y: 0 }, { stiffness: 0.2, damping: 1 });
  $: coords.set({ y: scrollY });
</script>

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
          transform: translate3d(0,{(-$coords.y *
          layerIndex) /
          (layers.length - 1)}px,0)
        "
      />
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

<style>
  :global(html) {
    --ssr-color: var(--c1);
    background-color: rgb(var(--ssr-color));
  }

  .parallax-container {
    /* 
    We don't want the container to go
    all the way to the top of the page;
    only to the top of the box shadow in the nav bar
    */
    margin-top: calc(-1 * var(--gap));

    --layer-height: calc(100vh - var(--nav-height) + var(--gap));
    --layer-min-height: 70vw;
    --layer-max-height: 160vw;

    height: var(--layer-height);
    min-height: var(--layer-min-height);
    max-height: var(--layer-max-height);
    background-color: rgb(var(--c1));

    position: relative;

    grid-column: fullpage-start / fullpage-end;
  }

  .parallax-container div {
    position: fixed;

    height: var(--layer-height);
    min-height: var(--layer-min-height);
    max-height: var(--layer-max-height);

    background-position: bottom center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;

    will-change: transform;
  }

  .content {
    position: relative;
    min-height: calc(100vh - var(--gap-2));
    background-color: rgb(var(--c1));
    /* 
    opt out of global grid
    to show background color around content.
    center will make it look pretty
    */
    grid-column: fullpage-start / fullpage-end;
    padding: var(--gap);
    text-align: center;
  }

  .content h1 {
    margin-top: 0;
  }
</style>
