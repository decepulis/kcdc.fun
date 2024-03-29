<script lang="ts">
	import { page } from '$app/stores';
	import type { GalleryListDocument } from '$lib/queries/routes/+layout';

	export let galleries: GalleryListDocument[];

	$: path = $page.url.pathname;

	let isPhotosOpen: boolean;
	const onWindowClick = (e: MouseEvent) => {
		if (isPhotosOpen) {
			// if this isn't the input itself...
			const isInput =
				e.target instanceof HTMLInputElement && e.target.id === 'photos-dropdown-checkbox';
			const isLabel =
				e.target instanceof HTMLLabelElement && e.target.htmlFor === 'photos-dropdown-checkbox';
			if (!isInput && !isLabel) {
				// ...close the dropdown
				isPhotosOpen = false;
			}
		}
	};
</script>

<svelte:window on:click={onWindowClick} />
<nav>
	<ul class="nav-list">
		<li>
			<a
				aria-current={path === '/' ? 'page' : undefined}
				class="nav-item"
				href="/"
				style="font-style:italic;"
			>
				kcdc
			</a>
		</li>
		<li>
			<input id="photos-dropdown-checkbox" type="checkbox" bind:checked={isPhotosOpen} />
			<label
				class="nav-item"
				class:active={path.includes('/photos')}
				for="photos-dropdown-checkbox"
			>
				photos
			</label>
			<ul class="nav-dropdown">
				{#each galleries as gallery}
					<li>
						<a
							aria-current={path === `/photos/${gallery.slug.current}` ? 'page' : undefined}
							class="nav-item"
							href="/photos/{gallery.slug.current}"
						>
							{gallery.title}
						</a>
					</li>
				{/each}
			</ul>
		</li>
	</ul>
</nav>

<style>
	:global(:root) {
		--nav-height: 4rem;
	}

	nav {
		position: sticky;
		top: 0;
		width: 100%;

		z-index: 1000;
		background-color: rgb(var(--c1));
		box-shadow: 0 0.25rem 0.5rem 0.5rem rgb(var(--c1));
		padding-top: 1rem;
	}

	.nav-list {
		margin: 0 auto;
		padding: 0;
		padding: env(safe-area-inset-top) env(safe-area-inset-left) 0 env(safe-area-inset-right);
		max-width: 86rem;

		display: flex;
	}

	.nav-list > li {
		display: block;
	}

	.nav-item {
		display: block;
		position: relative;
		text-decoration: none;
		color: white;
		opacity: 0.8;
		transition: opacity var(--transition-duration);
		padding: 1rem;
	}
	.nav-list > li > .nav-item {
		/* It's important that top-level nav items don't make the nav taller than necessary */
		margin: -1rem 0;
	}

	.nav-item::before {
		position: absolute;
		content: '';
		width: calc(100% - 2rem);
		height: 2px;
		background-color: rgb(var(--cx));
		display: block;
		bottom: 1rem;

		opacity: 0.85;
		transform: scaleX(0);
		transform-origin: 0 0;
		transition: opacity var(--transition-duration), transform var(--transition-duration);
	}

	.nav-item:hover {
		opacity: 0.85;
	}
	.nav-item:hover::before {
		opacity: 0.85;
		transform: scaleX(1);
	}

	input:focus ~ .nav-item,
	input:checked ~ .nav-item,
	.nav-item.active,
	.nav-item[aria-current] {
		opacity: 1;
	}
	input:focus ~ .nav-item::before,
	input:checked ~ .nav-item::before,
	.nav-item.active::before,
	.nav-item[aria-current]::before {
		opacity: 1;
		transform: scaleX(1);
	}

	label.nav-item {
		display: inline-block;
	}
	label.nav-item::after {
		content: '\203A';
		margin-left: 1ch;
		display: inline-block;

		transform: rotate(0);
		transition: transform var(--transition-duration);
	}
	input {
		appearance: none;
		opacity: 0;
		position: absolute;
	}
	input:focus ~ label.nav-item {
		outline-style: auto;
		outline-width: 1px;
	}
	input:checked ~ label.nav-item {
		background-color: rgb(var(--c2));
		transition: background-color var(--transition-duration) ease-in-out;
	}
	input:checked ~ label.nav-item::after {
		transform: rotate(90deg);
	}
	.nav-dropdown {
		background-color: rgb(var(--c2));
		border-top: none;
		position: absolute;
		top: calc(100% + 1rem);
		padding: 0;
		list-style-type: none;

		pointer-events: none;
		opacity: 0;
		transform: translateY(-0.5rem);
		transition: transform var(--transition-duration) ease-in-out,
			opacity var(--transition-duration) ease-in-out;
	}
	input:checked ~ .nav-dropdown {
		pointer-events: auto;
		transform: translateY(0);
		opacity: 1;
	}
</style>
