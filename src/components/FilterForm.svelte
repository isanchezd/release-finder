<script>
	import { Form, FormGroup, Input, Label, Button } from '@sveltestrap/sveltestrap';

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
	<div class="">
		<div class="row">
			<div class="col">
				<FormGroup>
					<b><Label for="url">Version</Label></b>
					<Input
						type="text"
						id="release"
						placeholder="release version"
						bind:value={formValues.version}
					/>
				</FormGroup>
			</div>
			<div class="col">
				<div class="row">
					<div class="col">
						<FormGroup>
							<b><Label for="url">From</Label></b>
							<Input type="date" id="from" bind:value={formValues.from} />
						</FormGroup>
					</div>
					<div class="col">
						<FormGroup>
							<b><Label for="url">To</Label></b>
							<Input type="date" id="to" bind:value={formValues.to} />
						</FormGroup>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col">
				<FormGroup>
					<b><Label for="url">Description</Label></b>
					<Input
						type="textarea"
						id="body"
						placeholder="piece of body"
						bind:value={formValues.description}
					/>
				</FormGroup>
			</div>
			<div class="col">
				<FormGroup>
					<b><Label for="url">Author</Label></b>
					<Input type="text" id="author" placeholder="Author" bind:value={formValues.author} />
				</FormGroup>
			</div>
		</div>
		<div class="row mt-2">
			<div class="col text-center">
				<Button color="primary" on:click={onClick}>Filtrar</Button>
			</div>
		</div>
	</div>
</Form>
