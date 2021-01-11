<script lang="ts">
  import Nav from "../components/Nav.svelte";
  export let segment: string;

  const backgroundsForSegment = {
    venue: "var(--c2)",
    hotels: "var(--c3)",
    registry: "var(--c4)",
  };

  $: backgroundColor = backgroundsForSegment[segment] ?? "var(--c1)";
  $: if (typeof window !== "undefined") {
    window.document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor
    );
  }
</script>

<style>
  :global(:root) {
    --gap: 1.4rem;
    --gap-half: calc(var(--gap) / 2);
    --gap-2: calc(var(--gap) * 2);

    --c1: #272442;
    --c2: #37325d;
    --c3: #474077;
    --c4: #574f92;
    --c5: #6960a9;
    --cx: rgb(241, 181, 125);

    --background-color: var(--c1);
  }

  :global(html, body) {
    margin: 0;
    padding: 0;
  }

  :global(body) {
    font-family: "Courier Prime", monospace;

    color: white;
    background-color: var(--background-color);
    transition: background-color 0.5s ease-in-out;
  }

  main {
    min-width: 320px;
  }
</style>

<Nav {segment} />

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital@0;1&display=swap"
    rel="stylesheet" />
</svelte:head>

<main>
  <slot />
</main>
