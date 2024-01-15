<script>
	import { Form, FormGroup, Input, Label, Button, Icon } from '@sveltestrap/sveltestrap';
	import { isValidUrl } from '../validators';
	import { t } from '../../i18n';

	/**
	 * @description onClick method
	 * @type { (url: string) => void }
	 */
	export let onClick;

	/**
	 * @type string
	 */
	let url = '';

	/**
	 * @description Input Field validation f
	 * @param {string} url
	 */
	const isInputInvalid = (url) => {
		return !isValidUrl(url) && url.length > 0;
	};
</script>

<Form>
	<b><Label for="url">{$t('page.field.repository-url')}</Label></b>
	
	<div class="d-flex">
		<Input
			type="text"
			id="url"
			invalid={isInputInvalid(url)}
			placeholder={$t('page.field.repository-url.placeholder')}
			bind:value={url}
		/>
		<Button color="primary" on:click={() => onClick(url)} role="search"><Icon name="search" /></Button>
	</div>
	<div class="row">
		<span class="text-danger">{isInputInvalid(url) ? $t('page.field.repository-url.error') : ''}</span>
	</div>
</Form>
