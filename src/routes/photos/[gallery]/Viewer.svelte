<script lang="ts">
	import { onMount } from 'svelte';
	import A11yDialog from 'a11y-dialog';
	import { XIcon } from 'svelte-feather-icons';

	import type { GalleryItem } from '$lib/queries/routes/photos/[gallery]';
	import { isDialogOpen, scrollToKey, activeKey } from '$lib/stores/viewer';
	import { hash } from '$lib/stores/hash';

	import ViewerScroll from './ViewerScroll.svelte';
	import ViewerOverlay from './ViewerOverlay.svelte';

	export let items: GalleryItem[];
	let itemKeys = items.map((item) => item._key);

	let container: HTMLDivElement;
	let dialog: A11yDialog;

	onMount(async () => {
		// We do two things on mount.
		// 1. Initialize the dialog component
		dialog = new A11yDialog(container);
		// Also: scroll lock
		dialog.on('show', () => (document.documentElement.style.overflowY = 'hidden'));
		dialog.on('hide', () => {
			document.documentElement.style.overflowY = '';

			// Also also: reset variables on dialog close
			$isDialogOpen = false;
			$activeKey = null;
			$hash = '';
		});

		// 2. Open it if there's a hash waiting for us
		if (itemKeys.includes($hash)) {
			$isDialogOpen = true;
			$scrollToKey = $hash;
		}

		return () => dialog.destroy();
	});

	// Here, we reactively listen to the $isDialogOpen variable
	// and use it to open/close the dialog as necessary
	$: {
		if (dialog) {
			if ($isDialogOpen) {
				dialog.show();
			} else {
				dialog.hide();
			}
		}
	}
</script>

<div bind:this={container} class="container" aria-label="Image Viewer" aria-hidden="true">
	<div class="backdrop" />
	<div class="content" role="document">
		{#if $isDialogOpen}
			<ViewerScroll {items} />
			<ViewerOverlay {items} />
		{/if}
	</div>
	<button
		class="close control"
		type="button"
		on:click={() => ($isDialogOpen = false)}
		aria-label="Close dialog"
	>
		<XIcon />
	</button>
</div>

<style>
	.container,
	.backdrop,
	.content {
		position: fixed;
		inset: 0;
	}
	.container {
		z-index: 2000;
		display: flex;
		align-items: center;
		justify-content: center;

		opacity: 1;
		pointer-events: auto;
		transition: opacity var(--transition-duration);
	}
	.container[aria-hidden='true'] {
		pointer-events: none;
		opacity: 0;
	}
	.backdrop {
		background-color: rgba(var(--c1), 0.95);
	}
	.content {
		z-index: 1;
	}
	.container :global(.control) {
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		border: none;
		border-radius: 50%;
		appearance: none;
		background: none;
		padding: 0;
		margin: 0.5rem;
		cursor: pointer;
		color: #fff;
		z-index: 2;
		position: relative;
		transition: color var(--transition-duration), background-color var(--transition-duration),
			opacity var(--transition-duration), transform var(--transition-duration);
	}
	.container :global(.control:after) {
		content: '';
		position: absolute;
		inset: -0.5rem;
	}
	.container :global(.control:disabled) {
		pointer-events: none;
		opacity: 0.5;
	}
	.container :global(.control:not([disabled]):hover) {
		color: rgb(var(--cx));
	}
	.container :global(.control:not([disabled]).active) {
		background-color: rgb(var(--cx));
		color: rgb(var(--c1));
	}

	.close.control {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
