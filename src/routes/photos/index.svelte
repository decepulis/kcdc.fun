<script lang="ts">
	import tags from '../../utilities/photoTags';
</script>

<h1>Photos!</h1>
<ul>
	{#each Object.keys(tags) as tag}
		<li>
			<a sveltekit:noscroll sveltekit:prefetch href="/photos/{tag}">
				{tag}
			</a>
		</li>
	{/each}
</ul>
