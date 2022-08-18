<script lang="ts">
	import { onMount } from 'svelte';
	import A11yDialog from 'a11y-dialog';
	import { XIcon, InfoIcon, ArrowLeftIcon, ArrowRightIcon } from 'svelte-feather-icons';

	import type { GalleryItem } from '$lib/queries/routes/photos/[gallery]';
	import { isDialogOpen, scrollToKey, activeKey } from '$lib/stores/viewer';
	import { hash } from '$lib/stores/hash';

	import ViewerScroll from './ViewerScroll.svelte';

	export let items: GalleryItem[];
	let itemKeys = items.map((item) => item._key);

	let showInfo = true;
	let container: HTMLDivElement;
	let dialog: A11yDialog;

	onMount(async () => {
		// We do two things on mount.
		// 1. Initialize the dialog component
		dialog = new A11yDialog(container);
		dialog.on('hide', () => {
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

	// Here, we have functions for next and previous photo,
	// as well as whether those controls should be active.
	$: hasPreviousPhoto = $activeKey !== null && itemKeys.indexOf($activeKey) > 0;
	$: prevPhoto = () => {
		if ($activeKey) {
			const currentIndex = itemKeys.indexOf($activeKey);
			const previousIndex = currentIndex - 1;
			if (currentIndex !== -1 && previousIndex >= 0) {
				$scrollToKey = itemKeys[previousIndex];
			}
		}
	};
	$: hasNextPhoto = $activeKey !== null && itemKeys.indexOf($activeKey) < itemKeys.length - 1;
	$: nextPhoto = () => {
		if ($activeKey) {
			const currentIndex = itemKeys.indexOf($activeKey);
			const nextIndex = currentIndex + 1;
			if (currentIndex !== -1 && nextIndex < itemKeys.length) {
				$scrollToKey = itemKeys[nextIndex];
			}
		}
	};
</script>

<div bind:this={container} class="container" aria-label="Image Viewer" aria-hidden="true">
	<div class="overlay" />
	<div class="content" role="document">
		{#if $isDialogOpen}
			<ViewerScroll {items} />
		{/if}
		<button
			class="close"
			type="button"
			on:click={() => ($isDialogOpen = false)}
			aria-label="Close dialog"
		>
			<XIcon />
		</button>
		<button
			class="info"
			type="button"
			on:click={() => (showInfo = !showInfo)}
			class:active={showInfo}
			aria-label="Show photo information"
		>
			<InfoIcon />
		</button>
		<div class="slide-controls">
			<button
				class="previous"
				type="button"
				on:click={prevPhoto}
				disabled={!hasPreviousPhoto}
				aria-label="Show previous photo"
			>
				<ArrowLeftIcon />
			</button>
			<button
				class="next"
				type="button"
				on:click={nextPhoto}
				disabled={!hasNextPhoto}
				aria-label="Show next photo"
			>
				<ArrowRightIcon />
			</button>
		</div>
	</div>
</div>

<style>
	.container,
	.overlay,
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
	.overlay {
		background-color: rgba(var(--c1), 0.95);
	}
	.content {
		z-index: 1;
	}
	button {
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
			opacity var(--transition-duration);
	}
	button:after {
		content: '';
		position: absolute;
		inset: -0.5rem;
	}
	button:disabled {
		pointer-events: none;
		opacity: 0.5;
	}
	button:not([disabled]):hover {
		color: rgb(var(--cx));
	}
	button:not([disabled]).active {
		background-color: rgb(var(--cx));
		color: rgb(var(--c1));
	}
	.close {
		position: absolute;
		top: 0;
		right: 0;
	}
	.info {
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.slide-controls {
		position: absolute;
		bottom: 0;
		right: 0;
		display: flex;
	}
</style>
