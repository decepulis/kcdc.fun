<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		const cloudName = 'decepulis';
		const { tag } = page.params;
		const photosResponse = await fetch(
			`https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`
		);

		if (photosResponse.ok) {
			return {
				props: {
					photos: await photosResponse.json(),
					cloudName
				}
			};
		} else {
			return {
				status: photosResponse.status,
				error: new Error(`Could not load ${tag}`)
			};
		}
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';

	import tags from '../../utilities/photoTags';

	import Gallery from '../../components/Cloudinary/TagGallery.svelte';
	import type { Photos } from '../../components/Cloudinary/types';

	export let photos: Photos;
	export let cloudName: string;

	let { tag } = $page.params;
	$: titleTag = tags[tag] ?? tag.replace('-', ' ');
</script>

<svelte:head>
	<title>{titleTag} | kcdc | Photos</title>
</svelte:head>

{#if tag === 'wedding'}
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
{/if}

<h2>{tag === 'wedding' ? 'Photos' : titleTag}</h2>
<Gallery {cloudName} {photos} />

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
