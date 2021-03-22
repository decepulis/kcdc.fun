<script>
  import Button from "../components/Button.svelte";
</script>

<svelte:head>
  <title>kcdc | Attendees</title>
</svelte:head>

<h2>Ceremony & Reception</h2>
<p>
  <img
    src="img/figures/venue.png"
    alt="A cute couple dances under the disco ball"
    class="p-img p-img-200 float-right"
  />
  May 8, 2021 at 5pm
  <br />
  <br />
  Bridge 410
  <br />
  410 N. Paulina St.
  <br />
  Chicago, IL 60622
  <br />
  <br />
  Dinner &amp; Dancing to Follow
  <br />
  <br />
  <Button href="https://goo.gl/maps/iv95UPVpV7X5wHDZA">Maps</Button>
</p>

<h2>Accommodations</h2>
<p>
  <img
    src="img/figures/hotel.png"
    alt="A cute couple with their dog, packed up and ready for a night in a hotel"
    class="p-img p-img-150 float-right"
  />
  We have secured* a hotel block with Hotel Chicago West Loop, just 5 minutes away
  from the venue. Hotel Chicago is offering us the following pricing as part of our
  hotel block:
</p>
<ul>
  <li>Single Full &mdash; $109</li>
  <li>Queen &mdash; $117</li>
  <li>King &mdash; $126</li>
</ul>
<ul>
  <li>On-Site Parking &mdash; $25/night</li>
  <li>Nearby Parking Garage &mdash; $16/night</li>
</ul>
<ul>
  <li>Pet Fee &mdash; $25/stay</li>
</ul>
<p>
  * Actually the hotel hasn't been responding to our emails in the last few
  weeks. Our next step is to face our millennial phone fears and... call them (
  <i>gasp</i>
  ).
</p>
<p>
  <Button href="#" disabled>Link Coming Really Soon I Promise?</Button>
</p>
<p>
  If you'd like a bit more room to stretch your legs, the venue also recommends
  the following nearby hotels:
</p>
<ul>
  <li>
    <a
      href="https://www.hyatt.com/en-US/hotel/illinois/hyatt-place-chicago-wicker-park/chizk?src=corp_lclb_gmb_seo_chizk"
    >
      Hyatt Place Chicago / Wicker Park &mdash; $$
    </a>
  </li>
  <li>
    <a href="https://www.therobey.com"> The Robey &mdash; $$ </a>
  </li>
  <li>
    <a href="https://thehoxton.com/chicago/">
      The Hoxton, Chicago &mdash; $$$
    </a>
  </li>
</ul>

<style>
  :global(html) {
    --ssr-color: var(--c3);
    background-color: rgb(var(--ssr-color));
  }
</style>
