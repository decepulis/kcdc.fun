<script lang="ts">
	export let path: string;
</script>

<nav>
	<ul>
		<li>
			<a
				aria-current={path === '/' ? 'page' : undefined}
				sveltekit:noscroll
				sveltekit:prefetch
				style="font-style:italic;"
				href=".">kcdc</a
			>
		</li>
		<li>
			<a
				aria-current={path === '/photos' ? 'page' : undefined}
				sveltekit:noscroll
				sveltekit:prefetch
				href="photos">photos</a
			>
		</li>
		<li class="hidden" tabindex="-1">
			<a
				tabindex="-1"
				aria-current={path === '/registry' ? 'page' : undefined}
				sveltekit:noscroll
				sveltekit:prefetch
				href="registry">registry</a
			>
		</li>
	</ul>
</nav>

<style>
	:global(:root) {
		--nav-height: calc(1rem + var(--gap-3));
	}

	nav {
		position: fixed;
		top: 0;
		width: 100%;

		/*
    We use a negative margin trick
    to open up space at the bottom of the nav
    for the drop shadow to be without clipping
    */
		margin-bottom: calc(-1 * var(--gap-2));
		padding-bottom: var(--gap-2);

		z-index: 1000;

		overflow-x: auto;
		overflow-y: hidden;
		scrollbar-width: thin;
	}
	@media (pointer: coarse) {
		/* On touch screens, we hide the scrollbar */
		nav::-webkit-scrollbar {
			display: none;
		}
	}
	nav::before {
		/*
    Background and gradient for nav:
    We do it here in a fixed :before so that the box shadow
    could exist inside the nav where we visually want it...
    without any of the weird css behavior that comes in
    when horizontal scroll happens
    */
		content: '';
		position: fixed;
		width: 100vw;
		height: calc(var(--nav-height) - var(--gap));
		left: 0;
		top: 0;
		/* background color stops just under text */
		background-color: rgb(var(--background-color, var(--ssr-color)));
		/* gradient under text handled by shadow */
		--shadow-offset: 3px;
		--shadow-height: calc(var(--gap) - var(--shadow-offset));
		box-shadow: 0 var(--shadow-offset) var(--shadow-height) var(--shadow-height)
			rgb(var(--background-color, var(--ssr-color)));
		transition: background-color var(--page-transition-duration) ease-in-out,
			box-shadow var(--page-transition-duration) ease-in-out;
	}

	ul {
		margin: 0;
		padding: 0;
		padding: 0 env(safe-area-inset-left) 0 env(safe-area-inset-right);

		display: flex;
	}
	ul::before,
	ul:after {
		/*
    Here's little gradients at the left and right side of the nav
    that indicate there's more to scroll
    */
		content: '';
		position: fixed;
		z-index: 1001;
		height: calc(var(--nav-height) - var(--gap) + var(--border));
		width: var(--gap);
		top: 0;
		/*
    Of course, once again, we need to use shadows instead of gradients
    because we can't transition gradients but we can shadows
    */
		box-shadow: 0 0 var(--gap-05) var(--gap-05) rgb(var(--background-color, var(--ssr-color)));
		transition: box-shadow var(--page-transition-duration) ease-in-out;
	}
	ul::before {
		left: calc(-1 * var(--gap));
	}
	ul::after {
		right: calc(-1 * var(--gap));
	}

	li {
		display: block;
	}

	a {
		display: block;
		position: relative;
		text-decoration: none;
		color: white;
		opacity: 0.7;
		transition: opacity var(--transition-duration);
		padding: var(--gap);

		/* increase tap target size */
		margin-bottom: calc(-1 * var(--gap));
	}

	a::after {
		position: absolute;
		content: '';
		width: calc(100% - var(--gap-2));
		height: var(--border);
		background-color: rgb(var(--cx));
		display: block;
		bottom: var(--gap);

		opacity: 0.85;
		transform: scaleX(0);
		transform-origin: 0 0;
		transition: opacity var(--transition-duration), transform var(--transition-duration);
	}

	a:hover {
		opacity: 0.85;
	}
	a:hover::after {
		opacity: 0.85;
		transform: scaleX(1);
	}

	a[aria-current] {
		opacity: 1;
	}
	a[aria-current]::after {
		opacity: 1;
		transform: scaleX(1);
	}
	.hidden {
		display: none;
	}
</style>
