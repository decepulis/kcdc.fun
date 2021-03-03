<script lang="ts">
  import { spring } from "svelte/motion";

  import CountdownTimer from "../components/CountdownTimer.svelte";

  let L0 = "img/layers/L0.svg";
  let L1 = "img/layers/L1.svg";
  let L2 = "img/layers/L2.svg";
  let L3 = "img/layers/L3.svg";
  let L4 = "img/layers/L4.svg";
  let BG = "img/layers/L5.jpg";
  const layers = [BG, L4, L3, L2, L1, L0];
  const layerFactors = layers.map((__, index) =>
    Math.pow(index / (layers.length - 1), 1.5)
  );

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
          transform: translate3d(0,{-$coords.y *
          layerFactors[layerIndex]}px,0);
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
  <p>
    <i>May 8, 2021</i>
    <br />
    <CountdownTimer utcHours={22} utcDate={8} utcMonth={5} utcYear={2021} />
  </p>
  <h2>An Update</h2>
  <p>
    Sadly, due to COVID-19, we have to move forward with our wedding at a
    reduced capacity. We expect the current Illinois restrictions to still be in
    effect by May 8th, so we are limiting our guest list to a small number.
  </p>
  <p>
    We hope that you’ll still be able to join us via our online ceremony. More
    information will be available here on the day of the wedding.
  </p>
  <p>
    We desperately wish we could invite everyone, and are so terribly sorry it
    hasn’t worked out that way. We do, however, still look forward to
    celebrating with you when conditions improve. Until then, we hope you stay
    safe and well, and know that our thoughts and hearts are with you.
  </p>
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
    min-height: calc(100vh - var(--gap-2) - var(--nav-height));

    padding-top: var(--gap);

    /*
    We use negative margins to show
    the background color around the content
     */
    background-color: rgb(var(--background-color, var(--ssr-color)));
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    padding-left: calc(50vw - 50%);
    padding-right: calc(50vw - 50%);

    /*
    And to make sure we have some room at the bottom
    */
    padding-bottom: var(--nav-height);
    margin-bottom: calc(-1 * var(--nav-height));
  }

  .content h1 {
    margin-top: 0;
  }
</style>
