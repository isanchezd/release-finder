<script>
	import { Form, FormGroup, Input, Label } from '@sveltestrap/sveltestrap';
	import { isValidUrl } from '../helpers';

	/**
	 * @description onInput method
	 * @type { (event: Event & {target: HTMLInputElement}) => void }
	 */
	export let onInput;

	/**
	 * @type string
	 */
	let url = '';

	/**
	 * @description Method for split the url in pieaces
	 * @param {string} url
	 */
	const isInputInvalid = (url) => {
		return !isValidUrl(url) && url.length > 0;
	};
</script>

<Form>
	<FormGroup>
		<b><Label for="url">Url del repositorio</Label></b>
		<Input
			type="text"
			id="url"
			invalid={isInputInvalid(url)}
			feedback="I could be wrong"
			placeholder="Repository url"
			on:input={onInput}
			bind:value={url}
		/>
	</FormGroup>
</Form>
