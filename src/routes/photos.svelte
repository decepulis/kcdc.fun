<script lang="ts">
  import Gallery from '../components/CloudinaryTagGallery.svelte'
</script>

<svelte:head>
  <title>kcdc | Video & Photos</title>
</svelte:head>

<h2>Video</h2>
<p class="embed-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube-nocookie.com/embed/IuhG5XDUMeQ?controls=0"
    title="The Wedding of Kristin Bradford and Darius Cepulis"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  />
</p>

<h2>Photos</h2>
<Gallery cloudName="decepulis" tag="kcdc"/>

<style>
  .embed-container {
    width: 100%;
    padding-bottom: calc(100% * 0.5625);
    position: relative;
  }
  .embed-container iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
</style>