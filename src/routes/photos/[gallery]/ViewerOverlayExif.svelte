<script lang="ts">
	import type { Exif } from '$lib/queries/snippets/image';
	import { slide } from 'svelte/transition';

	export let exif: Exif;

	const fmtTime = (isoDatetime: string) => {
		const datetime = new Date(isoDatetime);
		return datetime.toLocaleString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			timeZone: 'UTC'
		});
	};

	const removeStuffAtTheEndOfLens = (lens: string) => {
		const stuff = / \d+\.*\d*mm f\/\d+\.*\d*$/;
		const match = lens.match(stuff);
		return match ? lens.slice(0, match.index) : lens;
	};

	const APEXtoShutterSpeed = (apex: number) => {
		const shutterSpeed = Math.pow(2, -apex);
		if (shutterSpeed >= 1) {
			return `${shutterSpeed} s`;
		} else {
			return `1/${Math.round(1 / shutterSpeed)} s`;
		}
	};
</script>

<div class="exif">
	{#if exif.DateTimeOriginal}
		<div class="datetime">{fmtTime(exif.DateTimeOriginal)}</div>
	{/if}
	{#if exif.LensMake && exif.LensModel}
		<div class="lens">{exif.LensMake} {removeStuffAtTheEndOfLens(exif.LensModel)}</div>
	{/if}
	<div class="details">
		{#if exif.ISO}
			<span class="iso">ISO {exif.ISO}</span>
		{/if}
		{#if exif.FocalLength}
			<span class="focal-length">
				{exif.FocalLength}mm
				{#if exif.FocalLengthIn35mmFormat}
					({exif.FocalLengthIn35mmFormat}mm)
				{/if}
			</span>
		{/if}
		{#if exif.FNumber}
			<span class="f-stop">f1/{exif.FNumber}</span>
		{/if}
		{#if exif.ShutterSpeedValue}
			<span class="shutter-speed">{APEXtoShutterSpeed(exif.ShutterSpeedValue)}</span>
		{/if}
	</div>
</div>

<style>
	.exif {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
</style>
