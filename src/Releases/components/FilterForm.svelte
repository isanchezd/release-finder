<script>
	import { Form, FormGroup, Input, Label, Button } from '@sveltestrap/sveltestrap';
	import { t } from '../../i18n';

	/**
	 * @typedef FormValues
	 * @property {string} version
	 * @property {string} from
	 * @property {string} to
	 * @property {string} description
	 * @property {string} author
	 */

	/**
	 * @type { (formValues: FormValues) => Promise<void> }
	 * @param {FormValues} formValues
	 */
	export let onSubmit;

	/**
	 * @type FormValues
	 */
	let formValues = {
		version: '',
		from: '',
		to: '',
		description: '',
		author: ''
	};

	/**
	 *
	 * @param event {HTMLFormElement}
	 */
	const onClick = () => {
		onSubmit(formValues);
	};
</script>

<Form>
	<div class="row">
		<div class="col-12">
			<div class="row">
				<div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
					<FormGroup>
						<b><Label for="url">{$t('page.field.version')}</Label></b>
						<Input
							type="text"
							id="release"
							placeholder={$t('page.field.version.placeholder')}
							bind:value={formValues.version}
						/>
					</FormGroup>
				</div>
				<div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
					<FormGroup>
						<b><Label for="url">{$t('page.field.author')}</Label></b>
						<Input
							type="text"
							id="author"
							placeholder={$t('page.field.author.placeholder')}
							bind:value={formValues.author}
						/>
					</FormGroup>
				</div>
			</div>

			<div class="row">
				<div class="col-6 col-sm-12 col-md-12 col-lg-12 col-xl-12">
					<div class="row">
						<div class="col">
							<FormGroup>
								<b><Label for="url">{$t('page.field.from')}</Label></b>
								<Input type="date" id="from" bind:value={formValues.from} />
							</FormGroup>
						</div>
						<div class="col">
							<FormGroup>
								<b><Label for="url">{$t('page.field.to')}</Label></b>
								<Input type="date" id="to" bind:value={formValues.to} />
							</FormGroup>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
					<FormGroup>
						<b><Label for="url">{$t('page.field.description')}</Label></b>
						<Input
							type="textarea"
							id="body"
							placeholder={$t('page.field.description.placeholder')}
							bind:value={formValues.description}
						/>
					</FormGroup>
				</div>
			</div>
			<div class="row mt-2 text-center">
				<div class="col">
					<Button color="primary" on:click={onClick}>{$t('page.button.filter')}</Button>
				</div>
			</div>
		</div>
	</div>
</Form>
