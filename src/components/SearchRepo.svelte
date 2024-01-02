<script>
	import { Form, FormGroup, Input, Label } from '@sveltestrap/sveltestrap';
	import { isValidUrl } from '../helpers';
	import { t } from '../i18n';

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
		<b><Label for="url">{$t('page.field.repository-url')}</Label></b>
		<Input
			type="text"
			id="url"
			invalid={isInputInvalid(url)}
			feedback={$t('page.field.repository-url.error')}
			placeholder={$t('page.field.repository-url.placeholder')}
			on:input={onInput}
			bind:value={url}
		/>
	</FormGroup>
</Form>
