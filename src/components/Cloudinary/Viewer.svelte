<script lang="ts">
	import { fly } from 'svelte/transition';
	import { spring } from 'svelte/motion';

	import debounce from 'just-debounce-it';

	import { hash } from '../../stores/hash';
	import type { Context, Photos, Resource } from './types';
	import Map from './ViewerMap.svelte';
	import ViewerImage from './ViewerImage.svelte';

	export let cloudName: string;
	export let photos: Photos;

	// Extract variables from props
	const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
	let photoResources: Resource[] = [];
	$: photoResources = photos.resources.sort((a, b) => collator.compare(a.public_id, b.public_id));
	$: publicIds = photoResources.map((r) => r.public_id);

	$: activeId = publicIds.includes($hash) ? $hash : undefined;
	$: active = typeof activeId !== 'undefined';
	$: activeIndex = publicIds.indexOf(activeId);

	$: nextIndex = activeIndex < publicIds.length - 1 ? activeIndex + 1 : undefined;
	$: prevIndex = activeIndex > 0 ? activeIndex - 1 : undefined;

	$: {
		if (typeof document !== 'undefined') {
			if (active) {
				document.querySelector('body').style.overflow = 'hidden';
			} else {
				document.querySelector('body').style.removeProperty('overflow');
			}
		}
	}

	// Scroll to element when active index changes
	let slideshowContainer: HTMLUListElement;
	let isSpringing = false;
	const scrollSpring = spring(0, { stiffness: 0.15, damping: 0.95, precision: 1 });
	scrollSpring.subscribe((value) => {
		slideshowContainer?.scrollTo(value, 0);
	});
	let skipFirstAnimation = true;
	$: {
		// without an animation, the first time we open,
		// or any time we open after having closed
		if (!active) {
			skipFirstAnimation = true;
		}
	}
	$: {
		if (slideshowContainer && activeId) {
			const scrollStart = slideshowContainer.scrollLeft;
			const scrollTarget = activeIndex * slideshowContainer.clientWidth;
			if (skipFirstAnimation) {
				scrollSpring.set(scrollTarget, { hard: true });
				skipFirstAnimation = false;
			} else {
				isSpringing = true;
				scrollSpring
					.set(scrollStart, { hard: true })
					// we run this twice
					// because for some reason, once isn't enough
					// to interrupt a running spring?
					.then(() => scrollSpring.set(scrollTarget))
					.then(() => scrollSpring.set(scrollTarget))
					.then(() => (isSpringing = false));
			}
		}
	}

	// Change active element when user scrolls manually
	const onSlideshowScroll = debounce<svelte.JSX.UIEventHandler<HTMLUListElement>>((e) => {
		if (isSpringing) return;
		const { scrollLeft, clientWidth } = e.target as HTMLUListElement;
		if (scrollLeft % clientWidth === 0) {
			const newIndex = scrollLeft / clientWidth;
			hash.set(publicIds[newIndex]);
		}
	}, 100);

	// context helper
	const isDisplayContext = (context: Context | undefined) =>
		// has context, and...
		typeof context !== 'undefined' &&
		// ...context includes more than just dimensions.
		Object.keys(context.custom).filter((key) => key !== 'width' && key !== 'height').length > 0;

	// And some button listeners
	let containerElement: HTMLElement;
	let containerWidth: number;
	let containerHeight: number;
	let firstFocusableElement: HTMLElement;
	let lastFocusableElement: HTMLElement;
	let isContextVisible = true;
	const closeModal = () => hash.set('');
	const nextImage = () => {
		if (typeof nextIndex !== 'undefined') {
			hash.set(publicIds[nextIndex]);
		}
	};
	const prevImage = () => {
		if (typeof prevIndex !== 'undefined') {
			hash.set(publicIds[prevIndex]);
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
<div
	class="modal-container"
	class:active
	aria-modal={active}
	bind:offsetWidth={containerWidth}
	bind:offsetHeight={containerHeight}
	bind:this={containerElement}
>
	<ul
		class="slideshow"
		bind:this={slideshowContainer}
		class:snap={!isSpringing}
		on:scroll={onSlideshowScroll}
	>
		{#each photoResources as { public_id, width, height, context }, index}
			<li class="slide" data-publicid={public_id}>
				<ViewerImage
					{cloudName}
					{width}
					{height}
					publicId={public_id}
					sizeByWidth={width / height > containerWidth / containerHeight}
					active={index === activeIndex || index === nextIndex || index === prevIndex}
				/>
				{#if (index === activeIndex || index === nextIndex || index === prevIndex) && isDisplayContext(context) && isContextVisible}
					<div class="context-container" transition:fly={{ y: 100 }}>
						<div class="context-content">
							{#if typeof context.custom.alt !== 'undefined'}
								<p>{context.custom.alt}</p>
							{/if}
							{#if index === activeIndex && typeof context.custom.GPSLatitude !== 'undefined' && typeof context.custom.GPSLongitude !== 'undefined'}
								<Map
									latitude={context.custom.GPSLatitude}
									longitude={context.custom.GPSLongitude}
								/>
							{/if}
						</div>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
	<button
		on:click={prevImage}
		aria-label="Previous Image"
		disabled={typeof prevIndex === 'undefined'}
		class="prev-button modal-button"
		bind:this={firstFocusableElement}
	>
		<span class="button-text">&lsaquo;</span>
	</button>
	<button
		on:click={nextImage}
		aria-label="Next Image"
		disabled={typeof nextIndex === 'undefined'}
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
		disabled={!isDisplayContext(photoResources[activeIndex]?.context)}
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

	.slideshow {
		list-style-type: none;

		display: flex;

		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		padding: 0;
		margin: 0;

		overflow-y: scroll;
	}
	.slideshow.snap {
		scroll-snap-type: x mandatory;
	}
	.slide {
		scroll-snap-align: center;
		margin: 0;
		padding: 0;

		flex: 0 0 100vw;

		position: relative;
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

		touch-action: manipulation; /* disable double tap to zoom */
	}
	.next-button {
		right: 0;
		justify-content: flex-end;
	}
	.prev-button {
		left: 0;
		justify-content: flex-start;
	}

	.context-container {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		padding-top: calc(200vh / 3);
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
