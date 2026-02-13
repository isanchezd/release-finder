<script>
	import { Input, Button, ButtonGroup, Icon } from '@sveltestrap/sveltestrap';
	import { isValidUrl } from '../validators';
	import { t } from '../../../i18n';

	/**
	 * @typedef {Object} Props
	 * @property { (url: string) => void } onClick
	 * @property { () => void } onClear
	 */

	/** @type {Props} */
	let { onClick, onClear } = $props();

	/**
	 * @type string
	 */
	let url = $state('');

	/**
	 * @description Input Field validation
	 * @param {string} url
	 */
	const isInputInvalid = (url) => {
		return !isValidUrl(url) && url.length > 0;
	};

	/**
	 * @description Handle search on Enter key
	 * @param {KeyboardEvent} event
	 */
	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			onClick(url);
		}
	};

	/**
	 * @description Clear search and reset parent state
	 */
	const handleClear = () => {
		url = '';
		onClear();
	};
</script>

<div class="d-flex gap-3">
	<div class="position-relative flex-fill">
		<Input
			type="text"
			id="url"
			class="form-control form-control-lg ps-5 {isInputInvalid(url) ? 'is-invalid' : ''}"
			placeholder={$t('page.field.repository-url.placeholder')}
			bind:value={url}
			on:keypress={handleKeyPress}
		/>
		<Icon name="github" class="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
		{#if isInputInvalid(url)}
			<div class="invalid-feedback d-block">
				{$t('page.field.repository-url.error')}
			</div>
		{/if}
	</div>
	<ButtonGroup>
		<Button color="primary" size="lg" class="px-4 fw-medium" onclick={() => onClick(url)} role="search">
			<Icon name="search" class="me-2" />
			{$t('page.button.search')}
		</Button>
		<Button
			outline
			color="secondary"
			size="lg"
			class="px-4 fw-medium bg-transparent"
			onclick={handleClear}
			disabled={url.trim().length === 0}
		>
			<Icon name="x-lg" />
		</Button>
	</ButtonGroup>
</div>

