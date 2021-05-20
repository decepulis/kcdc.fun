<script lang="ts">
	import { onMount } from 'svelte';

	export let cloudName: string;
	export let tag: string;

	// Fetch list of photos
	interface Resource {
		public_id: string;
		version: number;
		format: string;
		width: number;
		height: number;
		created_at: string;
		type: string;
	}
	interface Photos {
		resources: Array<Resource>;
		updated_at: string;
	}
	type PublicIdManager = {
		[publicId: string]: {
			observed: boolean;
			reference: HTMLImageElement | undefined;
		};
	};

	let photos: Photos | undefined = undefined;
	let publicIdManagers: PublicIdManager = {};
	let featured: Photos | undefined = undefined;
	let featuredIds: string[] | undefined = undefined;

	$: {
		if (typeof photos === 'undefined') break $;
		photos.resources.forEach((resource) => {
			publicIdManagers[resource.public_id] = {
				observed: false,
				reference: undefined
			};
		});
	}
	$: {
		if (typeof featured === 'undefined') break $;
		featuredIds = featured.resources.map((resource) => resource.public_id);
	}

	onMount(async () => {
		const res = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`);
		photos = await res.json();
	});
	onMount(async () => {
		const res = await fetch(
			`https://res.cloudinary.com/${cloudName}/image/list/${tag}-featured.json`
		);
		featured = await res.json();
	});

	$: loaded = Object.keys(publicIdManagers).length !== 0 && typeof featuredIds !== 'undefined';

	// Set up grid
	// TODO: resize grid items to fill empty space on right
	// e.g., allow grid items to be 75px to 125px
	//       but don't use these variables;
	//       we want cloudinary to stick with 100 and 200
	const gridWidth = 100;
	const gridHeight = 100;
	const gridGap = 4;

	const featureFactor = 2;
	const featureWidth = gridWidth * featureFactor + gridGap;
	const featureHeight = gridHeight * featureFactor + gridGap;

	// Some URL generators for that grid
	const featureUrl = (publicId: string) =>
		`https://res.cloudinary.com/decepulis/image/upload/w_${featureWidth},h_${featureHeight},c_fill/q_auto/f_auto/${publicId}`;
	const standardUrl = (publicId: string) =>
		`https://res.cloudinary.com/decepulis/image/upload/w_${gridWidth},h_${gridHeight},c_fill/q_auto/f_auto/${publicId}`;
	const placeholderUrl = (publicId: string) =>
		`https://res.cloudinary.com/decepulis/image/upload/b_auto:predominant,c_pad,w_iw_div_2,ar_1/c_fill,g_south_east,w_1,h_1/q_auto/f_auto/${publicId}`;

	// Finally, lazy load photos as they appear
	let observer: IntersectionObserver | undefined = undefined;
	onMount(() => {
		if (typeof IntersectionObserver === 'undefined') return;
		const observerConfig: IntersectionObserverInit = {
			root: null,
			threshold: 0.5
		};
		observer = new IntersectionObserver((entries) => {
			const intersecting = entries?.[0]?.isIntersecting;
			if (intersecting) {
				// TODO: move data into image
			}
		}, observerConfig);

		return () => observer.disconnect();
	});
	$: {
		// fallback behavior for IE
		if (typeof IntersectionObserver === 'undefined') break $;

		// attach observers to images as they come in
		if (Object.keys(publicIdManagers).length === 0) break $;

		console.log('run');

		Object.entries(publicIdManagers).forEach(([publicId, entry]) => {
			console.log(publicId, entry);
		});
	}
</script>

{#if loaded}
	<ul style="--gridWidth:{gridWidth}px;--gridHeight:{gridHeight}px;--gridGap:{gridGap}px;">
		{#each Object.keys(publicIdManagers).sort().slice(0, 50) as publicId}
			<li class:featured={featuredIds.includes(publicId)}>
				<img
					src={publicIdManagers[publicId].observed
						? featuredIds.includes(publicId)
							? featureUrl(publicId)
							: standardUrl(publicId)
						: placeholderUrl(publicId)}
					alt=""
					bind:this={publicIdManagers[publicId].reference}
				/>
			</li>
		{/each}
	</ul>
{:else}
	<p>...loading</p>
{/if}

<style>
	ul {
		list-style-type: none;

		grid-column: fullpage-start / fullpage-end !important;

		padding: 0 var(--gap);

		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(var(--gridWidth), var(--gridWidth)));
		grid-auto-rows: var(--gridHeight);
		grid-auto-flow: row dense;
		gap: var(--gridGap);
	}
	li {
		margin: 0;
		overflow: hidden;
		transition: transform var(--transition-duration), box-shadow var(--transition-duration);
		cursor: pointer;
	}
	li:hover {
		transform: scale(1.03);
		box-shadow: 0 0 0 var(--border) rgb(var(--cx));
	}
	li:active {
		transform: scale(1);
	}

	.featured {
		grid-column: span 2;
		grid-row: span 2;
	}
	img {
		width: 100%;
		height: 100%;
	}
</style>
