<script lang="ts">
	import { Input, Label, Button, Icon, Form } from '@sveltestrap/sveltestrap';
	import { t } from '../../../i18n';
	import type { FormValues } from '../types';

	type Props = {
		onSubmit: (formValues: FormValues) => Promise<void> | void;
	};

	let { onSubmit }: Props = $props();

	let formValues = $state<FormValues>({
		version: '',
		from: '',
		to: '',
		description: '',
		author: ''
	});

	let showFilters = $state(true);
	let formElement: HTMLFormElement | undefined = $state();

	const clearFilters = (): void => {
		formValues = {
			version: '',
			from: '',
			to: '',
			description: '',
			author: ''
		};
	};

	const handleSubmit = (event: SubmitEvent): void => {
		event.preventDefault();
		onSubmit(formValues);
	};

	const handleReset = (): void => {
		clearFilters();
		onSubmit(formValues);
	};
</script>

<div>
	<div class="d-flex align-items-center justify-content-between mb-4">
		<h3 class="h6 fw-semibold d-flex align-items-center gap-2 mb-0">
			<Icon name="funnel" class="text-primary" />
			Advanced Filters
		</h3>
		<Button color="link" size="sm" class="text-decoration-none fw-medium" onclick={() => (showFilters = !showFilters)}>
			{showFilters ? 'Hide' : 'Show'} Filters
		</Button>
	</div>

	{#if showFilters}
		<Form onsubmit={handleSubmit}>
			<div class="mb-4">
				<div class="row g-3 mb-3">
					<div class="col-12 col-md-6 col-lg-3">
						<Label for="version" class="form-label small fw-medium">{$t('page.field.version')}</Label>
						<Input
							type="text"
							id="version"
							class="form-control"
							placeholder={$t('page.field.version.placeholder')}
							bind:value={formValues.version}
						/>
					</div>

					<div class="col-12 col-md-6 col-lg-3">
						<Label for="author" class="form-label small fw-medium">{$t('page.field.author')}</Label>
						<Input
							type="text"
							id="author"
							class="form-control"
							placeholder={$t('page.field.author.placeholder')}
							bind:value={formValues.author}
						/>
					</div>

					<div class="col-12 col-md-6 col-lg-3">
						<Label for="from" class="form-label small fw-medium">{$t('page.field.from')}</Label>
						<Input type="date" id="from" class="form-control" bind:value={formValues.from} />
					</div>

					<div class="col-12 col-md-6 col-lg-3">
						<Label for="to" class="form-label small fw-medium">{$t('page.field.to')}</Label>
						<Input type="date" id="to" class="form-control" bind:value={formValues.to} />
					</div>
				</div>

				<div class="row g-3 mb-3">
					<div class="col-12">
						<Label for="description" class="form-label small fw-medium">{$t('page.field.description')}</Label>
						<Input
							type="textarea"
							id="description"
							class="form-control"
							rows={2}
							placeholder={$t('page.field.description.placeholder')}
							bind:value={formValues.description}
						/>
					</div>
				</div>

				<div class="d-flex align-items-center justify-content-end gap-2 pt-2">
					<Button type="submit" color="primary" class="fw-medium">
						<Icon name="funnel-fill" class="me-2" />
						{$t('page.button.filter')}
					</Button>
					<Button type="reset" color="primary" class="fw-medium" on:click={handleReset}>
						{$t('page.button.clear')}
					</Button>
				</div>
			</div>
		</Form>
	{/if}
</div>
