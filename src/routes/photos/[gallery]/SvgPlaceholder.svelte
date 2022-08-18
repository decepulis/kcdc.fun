<script lang="ts">
	export let aspectRatio: number;
	export let color: string;
</script>

<svg viewBox="0 0 {aspectRatio} 1">
	<rect width="100%" height="100%" fill={color} />
</svg>
