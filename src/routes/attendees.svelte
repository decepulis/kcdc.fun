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
</p>
<h3 class="h5">Maps:</h3>
<p>
  <span style="white-space:nowrap;">
    <Button href="https://goo.gl/maps/iv95UPVpV7X5wHDZA">Google</Button>
    <Button
      href="https://maps.apple.com/?address=410%20N%20Paulina%20St,%20Chicago,%20IL%20%2060622,%20United%20States&auid=12558565121487026746&ll=41.889268,-87.669852&lsp=9902&q=Bridge%20410&_ext=ChoKBQgEEOIBCgQIBRADCgUIBhDfAQoECAoQABImKRa6EnJA8URAMZOK665C61XAOZSPOM5m8kRAQdtQDPp86lXAUAQ%3D"
    >
      Apple
    </Button>
    <Button href="https://waze.com/ul/hdp3wm18we">Waze</Button>
  </span>
</p>

<h2>Accommodations</h2>
<h3>Wedding Hotel</h3>
<p>
  <img
    src="img/figures/hotel.png"
    alt="A cute couple with their dog, packed up and ready for a night in a hotel"
    class="p-img p-img-150 float-right"
  />
  We have secured hotel block with Hotel Chicago West Loop, just 5 minutes away from
  the venue. And of course, we'll provide a way to get from the hotel to the venue
  and back, so you can have as much&hellip; cake&hellip; as you want.
</p>
<p>
  <Button
    href="http://be.synxis.com/?Hotel=9630&Chain=6017&Arrive=2021-05-07&Depart=2021-05-09&Group=CEPUL210507-184158"
  >
    Book Rooms
  </Button>
</p>
<p>The following options are also available upon arrival:</p>
<ul>
  <li>$25/night &mdash; On-site parking</li>
  <li>$16/night &mdash; Nearby parking</li>
  <li>$50/stay &mdash; Pet Fee</li>
</ul>
<h3 class="h5">Maps:</h3>
<p>
  <span style="white-space:nowrap;">
    <Button href="https://goo.gl/maps/Wep9gYzSnyYYCgCC7">Google</Button>
    <Button
      href="https://maps.apple.com/?address=1622%20W%20Jackson%20Blvd,%20Chicago,%20IL%20%2060612,%20United%20States&auid=1709128223409587896&ll=41.877865,-87.667782&lsp=9902&q=Hotel%20Chicago%20West%20Loop%20/%20Illinois%20Medical%20District&_ext=ChkKBQgEEOIBCgQIBRADCgQIBhALCgQIChAAEiYph9G9ic3vREAxzVafzx7rVcA5Bafj5fPwREBBhU23I1nqVcBQAw%3D%3D"
    >
      Apple
    </Button>
    <Button href="https://waze.com/ul/hdp3wjpd71">Waze</Button>
  </span>
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
