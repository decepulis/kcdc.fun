<script lang="ts">
	import type { Exif } from '$lib/queries/snippets/image';

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

	const APEXtoShutterSpeed = (apex: number) => {
		const shutterSpeed = Math.pow(2, -apex);
		if (shutterSpeed >= 1) {
			return `${shutterSpeed} s`;
		} else {
			return `1/${Math.round(1 / shutterSpeed)} s`;
		}
	};
	console.log({ exif });
</script>

<div class="exif">
	{#if exif.DateTimeOriginal}
		<div class="datetime">{fmtTime(exif.DateTimeOriginal)}</div>
	{/if}
	{#if exif.LensMake && exif.LensModel}
		<div class="lens">{exif.LensMake} {exif.LensModel}</div>
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
