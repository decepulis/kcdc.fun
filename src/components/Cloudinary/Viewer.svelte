<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import { hash } from '../../stores/hash';
	import { fullSizeSrc, placeholderSrc } from './utils';
	import type { Context, Photos } from './types';
	import Map from './Map.svelte';

	export let cloudName: string;
	export let photos: Photos;

	// Extract variables from props
	const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
	$: publicIds = photos.resources.map((resource) => resource.public_id).sort(collator.compare);
	$: activeId = publicIds.includes($hash) ? $hash : undefined;
	$: active = typeof activeId !== 'undefined';
	$: activeIndex = publicIds.indexOf(activeId);
	$: {
		if (typeof document !== 'undefined') {
			if (active) {
				document.querySelector('body').style.overflow = 'hidden';
			} else {
				document.querySelector('body').style.removeProperty('overflow');
			}
		}
	}

	let dimensionsById: { [publicId: string]: { width: number; height: number } } = {};
	let contextById: { [publicId: string]: Context } = {};
	$: photos.resources.forEach(({ public_id, width, height, context }) => {
		dimensionsById[public_id] = { width, height };
		if (typeof context !== 'undefined') {
			contextById[public_id] = context;
		}
	});
	$: nextAvailable = activeIndex < publicIds.length - 1;
	$: prevAvailable = activeIndex > 0;
	$: activeContext = contextById[activeId];
	$: hasContext =
		typeof activeContext !== 'undefined' &&
		Object.keys(activeContext.custom).filter((key) => key !== 'width' && key !== 'height').length >
			0;

	// Calculate aspect ratios
	$: imgWidth = dimensionsById[activeId]?.width;
	$: imgHeight = dimensionsById[activeId]?.height;
	$: imgRatio = imgWidth / imgHeight;
	let containerWidth: number;
	let containerHeight: number;
	$: containerRatio = containerWidth / containerHeight;

	$: sizeByWidth = imgRatio > containerRatio;

	// Get image URLs and handle loading them
	$: fullSize = fullSizeSrc({ cloudName, publicId: activeId });
	$: prevImageFullSize = prevAvailable
		? fullSizeSrc({ cloudName, publicId: publicIds[activeIndex - 1] })
		: undefined;
	$: nextImageFullSize = nextAvailable
		? fullSizeSrc({ cloudName, publicId: publicIds[activeIndex + 1] })
		: undefined;
	let loaded = false;
	$: $hash && (loaded = false); // set loaded to false when hash changes

	// And some click listeners
	let containerElement: HTMLElement;
	let firstFocusableElement: HTMLElement;
	let lastFocusableElement: HTMLElement;
	let isContextVisible = true;
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
	const toggleContext = () => {
		isContextVisible = !isContextVisible;
	};
	const onKeydown = (e: KeyboardEvent) => {
		if (typeof activeId === 'undefined') return;
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
		if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			toggleContext();
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
<svelte:head>
	{#if prevImageFullSize}
		<link rel="preload" as="image" href={prevImageFullSize} />
	{/if}
	{#if nextImageFullSize}
		<link rel="preload" as="image" href={nextImageFullSize} />
	{/if}
</svelte:head>
<div
	class="modal-container"
	class:active
	aria-modal={active}
	bind:offsetWidth={containerWidth}
	bind:offsetHeight={containerHeight}
	bind:this={containerElement}
>
	{#if active}
		{#key activeId}
			<div
				class="image-container"
				class:size-by-width={sizeByWidth}
				style="--width:{imgWidth};--height:{imgHeight};"
				transition:fade={{ duration: 150 }}
			>
				<img src={fullSize} on:load={() => (loaded = true)} class:loaded alt="" />
			</div>
			{#if hasContext && isContextVisible}
				<div class="context-container" transition:fly={{ y: 100 }}>
					<div class="context-content">
						{#if typeof activeContext.custom.alt !== 'undefined'}
							<p>{activeContext.custom.alt}</p>
						{/if}
						{#if typeof activeContext.custom.GPSLatitude !== 'undefined' && typeof activeContext.custom.GPSLongitude !== 'undefined'}
							<Map
								latitude={activeContext.custom.GPSLatitude}
								longitude={activeContext.custom.GPSLongitude}
							/>
						{/if}
					</div>
				</div>
			{/if}
		{/key}
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
	<button on:click={closeModal} aria-label="Close Image" class="close-button modal-button">
		<span class="button-text" aria-hidden>x</span>
	</button>
	<button
		on:click={toggleContext}
		aria-label="Toggle Description"
		disabled={!hasContext}
		class="context-button modal-button"
		class:active={isContextVisible}
		bind:this={lastFocusableElement}
	>
		<span class="button-text" aria-hidden>i</span>
	</button>
</div>

<style>
	.modal-container {
		position: fixed;
		z-index: 10000;
		height: 100vh;
		width: 100vw;
		top: 0;
		left: 0;

		pointer-events: none;
		opacity: 0;
		background-color: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(5px);
		transition: opacity var(--transition-duration-long);

		--button-size: 3rem;
		--button-padding: 1rem;
		--button-gutter-size: calc(2 * var(--button-padding) + var(--button-size));
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
		text-shadow: 0 0 4px black;
		font-family: inherit;
		font-size: 1.5rem;
		/* adding .125em because no modal button has descending typography */
		line-height: calc(var(--button-size) + 0.125em);

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
		text-align: center;
	}
	.modal-button:not([disabled]).active span {
		color: rgb(var(--cx));
	}
	.modal-button:not([disabled]):hover span {
		background-color: rgba(var(--cx), 0.75);
	}
	.close-button {
		top: 0;
		left: 0;
	}
	.context-button {
		top: 0;
		left: var(--button-gutter-size);
	}
	.next-button,
	.prev-button {
		width: var(--button-gutter-size);
		top: 0;
		bottom: 0;
		font-size: 2rem;
	}
	.next-button {
		right: 0;
		justify-content: flex-end;
	}
	.prev-button {
		left: 0;
		justify-content: flex-start;
	}

	.image-container {
		position: absolute;
		cursor: auto;
		/* I'd use placeholder, but I can't fade it in on load */
		background-color: black;
	}
	.image-container:not(.size-by-width) {
		height: 100vh;
		top: 0;
		width: calc(100vh * var(--width) / var(--height));
		left: 50%;
		transform: translateX(-50%);
	}
	.image-container.size-by-width {
		width: 100vw;
		left: 0;
		height: calc(100vw * var(--height) / var(--width));
		top: 50%;
		transform: translateY(-50%);
	}
	img {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;

		opacity: 0;
		transition: opacity 0s;
	}
	img.loaded {
		opacity: 1;
		transition: opacity var(--transition-duration);
	}

	.context-container {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100vh;
		padding-top: 80vh;
		overflow-y: scroll;
	}
	.context-content {
		min-height: calc(100vh / 3);
		padding: var(--button-gutter-size);

		text-shadow: 0 0 10px black;
		background: linear-gradient(
			rgba(0, 0, 0, 0),
			rgba(0, 0, 0, 0.5) var(--button-gutter-size),
			rgba(0, 0, 0, 0.75) calc(100vh / 3),
			rgba(0, 0, 0, 1)
		);
	}
	.context-content :first-child {
		margin-top: 0;
	}
	.context-content :last-child {
		margin-bottom: 0;
	}
	.context-content * {
		max-width: var(--content-width);
	}
</style>
