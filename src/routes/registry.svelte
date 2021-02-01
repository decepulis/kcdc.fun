<script>
  import Button from "../components/Button.svelte";
  import Grid from "../components/Grid.svelte";
  import GridItem from "../components/GridItem.svelte";
  import GridItemFooter from "../components/GridItemFooter.svelte";
</script>

<svelte:head>
  <title>Kristin & Darius | Registry</title>
</svelte:head>

<h1>Registry</h1>
<p>
  Most of you know that Kristin and I are indecisive and not very good at making
  wishlists. Which is why it probably won't surprise you to learn that we've
  made four registries.
</p>
<h2>Misfit Kitchenware</h2>
<p>As is, nothing in our kitchen matches. And we love it.</p>
<p>
  If you happen to have a single old plate, bowl, glass, silverware,
  something-else-ware that's ready for a new home, or maybe something you found
  in a thrift store, we'd love to adopt it into our collection of misfit
  kitchenware. So that every time we use it, we have something to remind us of
  you!
</p>
<h2>Building Towards Our Goals</h2>
<p>
  We live in a pretty small apartment and already have so much of what we need.
  Not to mention the fact that we don't have space for too much else!
</p>
<p>
  If you'd like, instead of going the more traditional registry route, you can
  help us build towards one of our goals!
</p>
<Grid>
  <GridItem>
    <h3>Honeymoon</h3>
    <p>
      We're very plan-it-ourselves budget-friendly travelers. Which, if we're
      being honest, means sleeping in bunk beds in a hostel, getting lost for
      half a day looking for the tour, and eating some bread and cheese and meat
      from the grocery store.
    </p>
    <p>Maybe, for our honeymoon, we'll let someone else do the planning.</p>
    <GridItemFooter>
      <Button
        href="https://www.nationalgeographic.com/expeditions/destinations/asia/journeys/mongolia-tour-gobi-desert-tsenkher/"
      >
        Learn More
      </Button>
      <Button
        href="https://www.myregistry.com/Visitors/Giftlist/CashGiftProcess.aspx?cashGiftId=995157&registryId=2725605"
      >
        Contribute
      </Button>
    </GridItemFooter>
  </GridItem>
  <GridItem>
    <h3>A Down Payment</h3>
    <p>
      One of the greatest joys of our life together so far has been owning a
      dog. One of the greatest hardships of our life together so far has been
      taking her out in the bitter Chicago winter. Which is probably why, when
      we're scrolling through Zillow yet again, dreaming of buying that perfect
      mid-century modern house, the first thing we check is how big the back
      yard is.
    </p>
    <GridItemFooter>
      <Button
        href="https://www.myregistry.com/Visitors/Giftlist/CashGiftProcess.aspx?cashGiftId=995154&registryId=2725605"
      >
        Contribute
      </Button>
    </GridItemFooter>
  </GridItem>
</Grid>
<h2>Normal Gifts</h2>
<p>Yes, we have a normal registry too! Because we knew you'd ask.</p>
<p>
  <Button
    href="https://www.myregistry.com/wedding-registry/kristin-bradford-and-darius-epulis-forest-park-il/2725605/giftlist"
    >Go To Registry</Button
  >
</p>
<p>And we always love surprises, too.</p>
<h2>Donations</h2>
<p>
  Below are a few causes that Kristin and I have given to. Each one represents a
  cause that couldn't be more important to us personally, especially during a
  time like a global pandemic.
</p>
<Grid>
  <GridItem>
    <h3>Earthworks</h3>
    <GridItemFooter>
      <Button href="https://www.charitywatch.org/charities/earthworks">
        Learn More
      </Button>
      <Button href="https://www.earthworks.org/donate/">Donate</Button>
    </GridItemFooter>
  </GridItem>
  <GridItem>
    <h3>Breast Cancer Research Foundation</h3>
    <GridItemFooter>
      <Button
        href="https://www.charitywatch.org/charities/breast-cancer-research-foundation"
      >
        Learn More
      </Button>
      <Button href="https://give.bcrf.org/give/302920/">Donate</Button>
    </GridItemFooter>
  </GridItem>
  <GridItem>
    <h3>ACLU</h3>
    <GridItemFooter>
      <Button
        href="https://www.charitywatch.org/charities/american-civil-liberties-union-aclu"
      >
        Learn More
      </Button>
      <Button href="https://action.aclu.org/give/now">Donate</Button>
    </GridItemFooter>
  </GridItem>
  <GridItem>
    <h3>National Alliance to End Homelessness</h3>
    <GridItemFooter>
      <Button
        href="https://www.charitywatch.org/charities/national-alliance-to-end-homelessness"
      >
        Learn More
      </Button>
      <Button href="https://help.endhomelessness.org/donate/">Donate</Button>
    </GridItemFooter>
  </GridItem>
  <GridItem>
    <h3>Action Against Hunger</h3>
    <GridItemFooter>
      <Button
        href="https://www.charitywatch.org/charities/action-against-hunger-usa"
      >
        Learn More
      </Button>
      <Button
        href="https://www.actionagainsthunger.org/donate/save-lives-end-hunger"
      >
        Donate
      </Button>
    </GridItemFooter>
  </GridItem>
</Grid>

<style>
  :global(html) {
    --ssr-color: var(--c5);
    background-color: rgb(var(--ssr-color));
  }

  h2 {
    border-bottom: var(--border) solid white;
  }
</style>
