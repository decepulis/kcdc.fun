<script lang="ts">
	import { scale } from 'svelte/transition';

	import { hash } from '../../stores/hash';
	import { fullSizeUrl, placeholderUrl } from './utils';
	import type { Photos } from './types';

	export let cloudName: string;
	export let photos: Photos;

	// Extract variables from props
	$: publicIds = photos.resources.map(({ public_id }) => public_id).sort();
	$: activeId = publicIds.includes($hash) ? $hash : undefined;
	$: activeIndex = publicIds.indexOf(activeId);
	$: nextAvailable = activeIndex < publicIds.length - 1;
	$: prevAvailable = activeIndex > 0;

	let dimensionsById: { [publicId: string]: { width: number; height: number } } = {};
	$: photos.resources.forEach(
		({ public_id, width, height }) => (dimensionsById[public_id] = { width, height })
	);

	$: active = typeof activeId !== 'undefined';

	// Calculate aspect ratios
	$: imgWidth = dimensionsById[activeId]?.width;
	$: imgHeight = dimensionsById[activeId]?.height;
	$: imgRatio = imgWidth / imgHeight;
	let containerWidth: number;
	let containerHeight: number;
	$: containerRatio = containerWidth / containerHeight;

	$: sizeByWidth = imgRatio > containerRatio;

	// Get image URLs and handle loading them
	$: placeholder = placeholderUrl({ cloudName, publicId: activeId });
	$: fullSize = fullSizeUrl({ cloudName, publicId: activeId });
	let loaded = false;
	$: {
		// when activeId changes, set loaded to false
		if (activeId) {
			loaded = false;
		}
	}

	// And some click listeners
	let containerElement: HTMLElement;
	let firstFocusableElement: HTMLElement;
	let lastFocusableElement: HTMLElement;
	const closeModal = () => hash.set('');
	const nextImage = () => {
		if (nextAvailable) {
			hash.set(publicIds[activeIndex + 1]);
		}
	};
	const prevImage = () => {
		if (prevAvailable) {
			hash.set(publicIds[activeIndex - 1]);
		}
	};
	const onContainerClick = (e: MouseEvent) => {
		// if click is on backdrop and not child...
		if (e.target === e.currentTarget) {
			// close the operation down
			closeModal();
		}
	};
	const onKeydown = (e: KeyboardEvent) => {
		if (!active) return;
		// Close the modal on escape
		if (e.key === 'Escape') {
			closeModal();
		}
		// Advance the slideshow on arrow keys
		if (e.key === 'ArrowRight') {
			nextImage();
		}
		if (e.key === 'ArrowLeft') {
			prevImage();
		}
		// Finally, trap focus on tab
		if (e.key === 'Tab' && typeof document !== 'undefined') {
			if (!containerElement.contains(document.activeElement)) {
				// if focus is outside the container, bring it on in
				e.preventDefault();
				firstFocusableElement.focus();
			} else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
				// if focus is already trapped, keep it trapped
				e.preventDefault();
				firstFocusableElement.focus();
			} else if (e.shiftKey && document.activeElement === firstFocusableElement) {
				// same goes for if shift key is held
				e.preventDefault();
				lastFocusableElement.focus();
			}
		}
	};
</script>

<svelte:window on:keydown={onKeydown} />
<div
	class="modal-container"
	class:active
	aria-modal={active}
	on:click={onContainerClick}
	bind:offsetWidth={containerWidth}
	bind:offsetHeight={containerHeight}
	bind:this={containerElement}
>
	{#if typeof activeId !== 'undefined'}
		<div
			class="image-container"
			class:size-by-width={sizeByWidth}
			style="--width:{imgWidth};--height:{imgHeight};background-image:url({placeholder});"
			transition:scale={{ duration: 300, start: 0.85, opacity: 1 }}
		>
			<img src={fullSize} on:load={() => (loaded = true)} class:loaded alt="" />
		</div>
	{/if}
	<button
		on:click={prevImage}
		aria-label="Previous Image"
		disabled={!prevAvailable}
		class="prev-button modal-button"
		bind:this={firstFocusableElement}
	>
		<span class="button-text">&lsaquo;</span>
	</button>
	<button
		on:click={nextImage}
		aria-label="Next Image"
		disabled={!nextAvailable}
		class="next-button modal-button"
	>
		<span class="button-text">&rsaquo;</span>
	</button>
	<button
		on:click={closeModal}
		aria-label="Close Image"
		class="close-button modal-button"
		bind:this={lastFocusableElement}
	>
		<span class="button-text">&times;</span>
	</button>
</div>

<style>
	.modal-container {
		position: fixed;
		z-index: 10000;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		pointer-events: none;
		opacity: 0;
		background-color: rgba(0, 0, 0, 0.75);
		transition: opacity var(--transition-duration-long);

		display: flex;
		align-items: center;
		justify-content: center;

		--button-size: 3rem;
		--button-padding: 1rem;
	}
	.modal-container.active {
		pointer-events: auto;
		cursor: pointer;
		opacity: 1;
	}
	.modal-button {
		position: absolute;
		background: none;
		border: 0;
		padding: var(--gap);
		cursor: pointer;
		color: white;
		font-family: inherit;
		line-height: inherit;
		font-size: 2rem;

		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		display: flex;
		align-items: center;
	}
	.modal-button[disabled] {
		opacity: 0.5;
		cursor: auto;
	}
	.modal-button span {
		width: var(--button-size);
		height: var(--button-size);
		border-radius: 50%;
		transition: background-color var(--transition-duration), color var(--transition-duration);
	}
	.modal-button:not([disabled]):hover span {
		background-color: rgba(var(--cx), 0.75);
		color: rgb(var(--c1));
	}
	.close-button {
		top: 0;
		right: 0;
		justify-content: flex-end;
	}
	.next-button {
		width: 33vw;
		top: 0;
		bottom: 0;
		right: 0;
		justify-content: flex-end;
	}
	.prev-button {
		width: 33vw;
		top: 0;
		bottom: 0;
		left: 0;
		justify-content: flex-start;
	}

	.image-container {
		position: relative;
		cursor: auto;
	}
	.image-container:not(.size-by-width) {
		--image-height: 100vh;
		height: var(--image-height);
		padding-left: calc(var(--image-height) * var(--width) / var(--height));
	}
	.image-container.size-by-width {
		--image-width: 100vw;
		width: var(--image-width);
		padding-bottom: calc(var(--image-width) * var(--height) / var(--width));
	}
	img {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;

		opacity: 0;
		transition: opacity var(--transition-duration-long);
	}
	img.loaded {
		opacity: 1;
	}
</style>
