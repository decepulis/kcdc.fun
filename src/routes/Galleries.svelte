<script lang="ts">
	import { page } from '$app/stores';
	import { urlFor } from '$lib/sanity/client';
	import SvgPlaceholder from './photos/[gallery]/SvgPlaceholder.svelte';
</script>

<ul class="galleries">
	{#each $page.data.galleries as gallery}
		<li class="gallery">
			<a href="/photos/{gallery.slug.current}">
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
		gap: 0.5rem;
	}
	.gallery {
		margin: 0;
		background-color: rgb(var(--c2));
		text-align: center;
	}
	.gallery a {
		padding: 1rem;
	}
	.gallery h3 {
		margin: 0;
	}
</style>
