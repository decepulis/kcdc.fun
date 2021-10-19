<script lang="ts">
	import { onMount } from 'svelte';

	import { MAPBOX_TOKEN } from '../../utilities/env';

	import type { Latitude, Longitude, Direction } from './types';

	export let latitude: Latitude;
	export let longitude: Longitude;

	const coordinateExpression = /(\d+) deg (\d+)' (\d+\.\d+)" (N|E|S|W)/;
	function parseCoordinate(coordinate: Latitude | Longitude): number {
		const [__, degrees, arcminutes, arcseconds, direction] = coordinate.match(
			coordinateExpression
		) as [Latitude | Longitude, string, string, string, Direction];

		return (
			(direction === 'N' || direction === 'E' ? 1 : -1) *
			(parseInt(degrees) + parseInt(arcminutes) / 60 + parseFloat(arcseconds) / 3600)
		);
	}

	$: parsedLatitude = parseCoordinate(latitude);
	$: parsedLongitude = parseCoordinate(longitude);

	let mapElement: HTMLDivElement;
	onMount(() => {
		const importMapboxGL = import('mapbox-gl');
		const importMapboxCSS = import('mapbox-gl/dist/mapbox-gl.css');
		Promise.all([importMapboxGL, importMapboxCSS]).then(([{ default: MapboxGl }]) => {
			const map = new MapboxGl.Map({
				accessToken: MAPBOX_TOKEN,
				container: mapElement,
				style: 'mapbox://styles/decepulis/ckuwt4z5j0y0f18p5j0z4vwdy?optimize=true',
				center: { lat: parsedLatitude, lng: parsedLongitude },
				zoom: 10
			});
			const cx = getComputedStyle(document.documentElement).getPropertyValue('--cx');
			map.on('load', () => {
				new MapboxGl.Marker({ color: `rgb(${cx})` })
					.setLngLat({ lat: parsedLatitude, lng: parsedLongitude })
					.addTo(map);
			});
		});
	});
</script>

<div bind:this={mapElement} />

<style>
	div {
		width: 100%;
		max-width: var(--content-width);
		height: 300px;
		max-height: calc(100vw - 4 * var(--button-padding) - 2 * var(--button-size));
		background-color: rgb(var(--c1));
	}
</style>
