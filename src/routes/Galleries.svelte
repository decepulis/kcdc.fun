<script lang="ts">
	import { page } from '$app/stores';
	import { urlFor } from '$lib/sanity/client';
	import type { SanityAsset } from '@sanity/image-url/lib/types/types';

	const urlForAsset = (asset: SanityAsset, dpr = 1) => urlFor(asset).size(120, 120).dpr(dpr).url();
</script>

<ul class="galleries">
	{#each $page.data.galleries as gallery}
		{@const asset = gallery.featuredPhoto.asset}
		<li class="gallery">
			<a href="/photos/{gallery.slug.current}">
				<div class="image-container" style:--color={asset.metadata.palette.dominant.background}>
					<img
						src={urlForAsset(asset)}
						srcset="{urlForAsset(asset)} 1x, {urlForAsset(asset, 2)} 2x"
						width={120}
						height={120}
						alt={gallery.title}
					/>
				</div>
				<h3>{gallery.title}</h3>
			</a>
		</li>
	{/each}
</ul>

<style>
	.galleries {
		list-style-type: none;
		padding: 0;
		margin: 0;

		display: grid;
		grid-template-columns: repeat(auto-fit, 144px);
		gap: 0.75rem;
	}
	.gallery {
		margin: 0;
		background-color: rgb(var(--c2));
		text-align: center;
	}
	.gallery a {
		padding: 0.75rem;
		position: relative;
		display: flex;
		flex-direction: column;
	}
	.image-container {
		background-color: var(--color);
		margin-bottom: 0.75rem;
	}
	.gallery img {
		width: 100%;
		height: auto;
		display: block;
	}
	.gallery h3 {
		margin: 0;
	}
</style>
