<script lang="ts">
	import { goto } from '$app/navigation';
	import kebabCase from 'just-kebab-case';

	import Form from '../../components/Form.svelte';
	import Button from '../../components/Button.svelte';

	let galleryInput: string | undefined | null;
	$: disabled = !galleryInput || galleryInput === '';
	const onFormSubmit: svelte.JSX.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		goto(`/photos/${kebabCase(galleryInput.toLowerCase())}`);
	};
</script>

<h1>Photos!</h1>
<Form onSubmit={onFormSubmit}>
	<label for="gallery-input"> Enter the name of the gallery you would like to view.</label>
	<p>Looking for wedding photos? Try "kcdc".</p>
	<input type="text" id="gallery-input" bind:value={galleryInput} />
	<Button {disabled}>Go!</Button>
</Form>
