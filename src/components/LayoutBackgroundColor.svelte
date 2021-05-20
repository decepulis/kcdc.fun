<script lang="ts">
	export let path: string;
	export let pageTransitionDuration: number;

	const backgroundsForPath = {
		// these values correspond to the html background colors
		// defined in each file
		'/photos': 'var(--c2)',
		'/rsvp': 'var(--c2)',
		'/attendees': 'var(--c3)',
		'/registry': 'var(--c4)'
	};

	$: backgroundColorValue = backgroundsForPath[path] ?? 'var(--c1)';
	$: pageTransitionDurationValue = `${pageTransitionDuration}ms`;

	$: if (typeof window !== 'undefined') {
		window.document.documentElement.style.setProperty('--background-color', backgroundColorValue);
		window.document.documentElement.style.setProperty(
			'--page-transition-duration',
			pageTransitionDurationValue
		);
	}
</script>

<style>
	:global(html) {
		/* Before any JS runs, by default, the background will be c1 */
		--ssr-color: var(--c1);
		background-color: rgb(var(--ssr-color));
	}
	:global(body) {
		/* Once JS runs, the body background color takes over */
		background-color: rgb(var(--background-color));
		transition: background-color var(--page-transition-duration) ease-in-out;
	}
</style>
