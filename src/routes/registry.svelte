<script lang="ts">
	import Button from '../components/Button.svelte';
	import RegistryList from '../components/RegistryList.svelte';
	import RegistryListItem from '../components/RegistryListItem.svelte';
	import RegistryListItemFooter from '../components/RegistryListItemFooter.svelte';
</script>

<svelte:head>
	<title>kcdc | Registry</title>
</svelte:head>
<h1>Registry</h1>
<p>
	<img
		src="/img/figures/registry.png"
		alt="A cute couple; one hands a gift to the other, who responds with a heart"
		class="p-img p-img-150 float-left"
	/>
	Most of you know that Kristin and I are indecisive and not very good at making wishlists. Which is
	why it probably won't surprise you to learn that we've made four registries.
</p>
<h2>Misfit Kitchenware</h2>
<p>Nothing in our kitchen matches. And we love it.</p>
<p>
	If you happen to have a single old plate, bowl, glass, silverware, something-else-ware that's
	ready for a new home, or maybe something you found in a thrift store, we'd love to adopt it into
	our collection of misfit kitchenware. So that every time we use it, we have something to remind us
	of you!
</p>
<h2>Building Towards Our Goals</h2>
<p>
	<img
		src="/img/figures/home.png"
		alt="A cute couple with their pup, proudly standing next to their new house."
		class="p-img float-right"
	/>
	We live in a pretty small apartment and already have so much of what we need. Not to mention the fact
	that we don't have space for too much else!
</p>
<p>
	If you'd like, instead of going the more traditional registry route, you can help us build towards
	one of our goals!
</p>
<RegistryList>
	<RegistryListItem>
		<h3>Honeymoon</h3>
		<p>
			We're very plan-it-ourselves budget-friendly travelers. Which, if we're being honest, means
			sleeping in bunk beds in a hostel, getting lost for half a day looking for the tour, and
			eating some bread and cheese and meat from the grocery store.
		</p>
		<p>Maybe, for our honeymoon, we'll let someone else do the planning.</p>
		<RegistryListItemFooter>
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
		</RegistryListItemFooter>
	</RegistryListItem>
	<RegistryListItem>
		<h3>A Down Payment</h3>
		<p>
			One of the greatest joys of our life together so far has been owning a dog. One of the
			greatest hardships of our life together so far has been taking her out in the bitter Chicago
			winter. Which explains why, when we're scrolling through Zillow, dreaming of a house we might
			one day own, the first thing we check is how big the back yard is.
		</p>
		<RegistryListItemFooter>
			<Button href="https://www.myregistry.com/giftlist/kcdc">Contribute</Button>
		</RegistryListItemFooter>
	</RegistryListItem>
</RegistryList>
<h2>Normal Gifts</h2>
<p>
	<img
		src="/img/figures/rei.png"
		alt="A cute couple; one helps the other over the mountaintop"
		class="p-img p-img-150 float-left"
	/>
	Yes, we have a normal registry, too! Well, maybe a few. (Of course, we always love surprises, too.)
</p>
<RegistryList smol>
	<RegistryListItem>
		<h3 class="h5">REI</h3>
		<RegistryListItemFooter>
			<Button
				href="https://www.myregistry.com/rei/wedding-registry/kristin-bradford-and-darius-epulis-forest-park-il/2725605"
				>View</Button
			>
		</RegistryListItemFooter>
	</RegistryListItem>
	<RegistryListItem>
		<h3 class="h5">EarthHero</h3>
		<RegistryListItemFooter>
			<Button href="https://earthhero.com/registry/NDk0MDE6MjU4Mjc6NzI0N2Vi/">View</Button>
		</RegistryListItemFooter>
	</RegistryListItem>
	<RegistryListItem>
		<h3 class="h5">Target</h3>
		<RegistryListItemFooter>
			<Button
				href="https://www.target.com/gift-registry/giftgiver?registryId=6ef5f4634d554735885b4abe1dccf5d3"
				>View</Button
			>
		</RegistryListItemFooter>
	</RegistryListItem>
	<RegistryListItem>
		<h3 class="h5">MadeTrade</h3>
		<RegistryListItemFooter>
			<Button href="https://www.madetrade.com/pages/gift-registry">View</Button>
		</RegistryListItemFooter>
	</RegistryListItem>
</RegistryList>
<h2>Donations</h2>
<p>
	Below are a few causes that Kristin and I have given to. Each one represents a cause that couldn't
	be more important to us personally, especially during a time like a global pandemic.
</p>
<p>
	We would be absolutely thrilled if you chose to make a donation in our name as a present to us.
</p>
<RegistryList>
	<RegistryListItem>
		<h3 class="h5">Earthworks</h3>
		<RegistryListItemFooter>
			<Button href="https://www.charitywatch.org/charities/earthworks">Learn More</Button>
			<Button href="https://www.earthworks.org/donate/">Donate</Button>
		</RegistryListItemFooter>
	</RegistryListItem>
	<RegistryListItem>
		<h3 class="h5">Breast Cancer<br />Research Foundation</h3>
		<RegistryListItemFooter>
			<Button href="https://www.charitywatch.org/charities/breast-cancer-research-foundation">
				Learn More
			</Button>
			<Button href="https://give.bcrf.org/give/302920/">Donate</Button>
		</RegistryListItemFooter>
	</RegistryListItem>
	<RegistryListItem>
		<h3 class="h5">American Civil<br />Liberties Union</h3>
		<RegistryListItemFooter>
			<Button href="https://www.charitywatch.org/charities/american-civil-liberties-union-aclu">
				Learn More
			</Button>
			<Button href="https://action.aclu.org/give/now">Donate</Button>
		</RegistryListItemFooter>
	</RegistryListItem>
	<RegistryListItem>
		<h3 class="h5">National Alliance to End Homelessness</h3>
		<RegistryListItemFooter>
			<Button href="https://www.charitywatch.org/charities/national-alliance-to-end-homelessness">
				Learn More
			</Button>
			<Button href="https://help.endhomelessness.org/donate/">Donate</Button>
		</RegistryListItemFooter>
	</RegistryListItem>
	<RegistryListItem>
		<h3 class="h5">Action Against<br />Hunger</h3>
		<RegistryListItemFooter>
			<Button href="https://www.charitywatch.org/charities/action-against-hunger-usa">
				Learn More
			</Button>
			<Button href="https://www.actionagainsthunger.org/donate/save-lives-end-hunger">
				Donate
			</Button>
		</RegistryListItemFooter>
	</RegistryListItem>
	<RegistryListItem>
		<h3 class="h5">Native American<br />Rights Fund</h3>
		<RegistryListItemFooter>
			<Button href="https://www.charitywatch.org/charities/native-american-rights-fund">
				Learn More
			</Button>
			<Button href="https://secure.narf.org/page/64457/donate/1">Donate</Button>
		</RegistryListItemFooter>
	</RegistryListItem>
</RegistryList>

<style>
	:global(html) {
		--ssr-color: var(--c4);
		background-color: rgb(var(--ssr-color));
	}

	h2 {
		border-bottom: var(--border) solid white;
	}
</style>
