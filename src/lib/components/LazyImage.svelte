<script lang="ts">
	export let alt: string;
	let loaded = false;
</script>

<img {...$$props} {alt} loading="lazy" on:load={() => (loaded = true)} class:loaded />

<style>
	img {
		opacity: 0;
		transition: opacity var(--transition-duration-long) ease-in-out;
	}
	img.loaded {
		opacity: 1;
	}
</style>
