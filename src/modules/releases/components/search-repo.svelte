<script lang="ts">
	import { Input, Button, Icon, Form } from '@sveltestrap/sveltestrap';
	import { isValidUrl } from '../validators';
	import { t } from '../../../i18n';

	type Props = {
		onClick: (url: string) => void;
		onClear: () => void;
	};

	let { onClick, onClear }: Props = $props();

	let url = $state('');

	const disabled = $derived(url.trim().length === 0);

	const isInputInvalid = (url: string): boolean => {
		return !isValidUrl(url) && url.length > 0;
	};

	const handleSubmit = (event: SubmitEvent): void => {
		event.preventDefault();
		onClick(url);
	};

	const handleReset = (): void => {
		url = '';
		onClear();
	};
</script>

<Form on:submit={handleSubmit}>
	<div class="d-flex gap-3">
		<div class="position-relative flex-fill">
			<Input
				type="text"
				id="url"
				class="form-control form-control-lg ps-5 {isInputInvalid(url) ? 'is-invalid' : ''}"
				placeholder={$t('page.field.repository-url.placeholder')}
				bind:value={url}
			/>
			<Icon name="github" class="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
			{#if isInputInvalid(url)}
				<div class="invalid-feedback d-block">
					{$t('page.field.repository-url.error')}
				</div>
			{/if}
		</div>
		<Button
			type="reset"
			outline
			color="secondary"
			size="lg"
			class="px-4 fw-medium bg-transparent"
			on:click={handleReset}
			disabled={disabled}
		>
			<Icon name="x-lg" />
		</Button>
		<Button type="submit" color="primary" size="lg" class="px-4 fw-medium" disabled={disabled}>
			<Icon name="search" class="me-2" />
			{$t('page.button.search')}
		</Button>
	</div>
</Form>

