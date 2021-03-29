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
<h3>Wedding Hotel</h3>
<p>
  <img
    src="img/figures/hotel.png"
    alt="A cute couple with their dog, packed up and ready for a night in a hotel"
    class="p-img p-img-150 float-right"
  />
  We have secured* a hotel block with Hotel Chicago West Loop, just 5 minutes away
  from the venue. And of course, we'll provide a way to get from the hotel to the
  venue and back, so you can have as much&hellip; cake&hellip; as you want.
</p>
<p>
  Hotel Chicago is offering us the following pricing as part of our hotel block:
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
  <Button href="#" disabled>Link Coming Really Soon I Promise?</Button>
</p>
<p>
  * The hotel has confirmed our block, but has yet to provide us with a link. If
  you would like to book immediately, please contact us and we will put you in
  touch with our point of contact directly.
</p>
<h3>Alternatives</h3>
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
