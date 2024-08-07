<script lang="ts">
	import Grid from './Grid.svelte';
	import Viewer from './Viewer.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="layout-container">
	<h1>{data.title}</h1>
	<Grid items={data.items} />
	<p>
		<a href="/photos">&larr; All photos</a>
	</p>
</section>
<Viewer items={data.items} />
