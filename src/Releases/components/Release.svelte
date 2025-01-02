<script>
	import {
		Card,
		CardBody,
		CardFooter,
		CardHeader,
		CardText,
		CardTitle
	} from '@sveltestrap/sveltestrap';
	import SvelteMarkdown from 'svelte-markdown';
	import { t } from '../../i18n';

	/**
	 * @typedef Author
	 * @property {string} login
	 * @property { string } html_url
	 */

	/**
	 * @typedef Release
	 * @property {number} id
	 * @property {string} name
	 * @property {string} body
	 * @property {Author} author
	 * @property {string} created_at
	 */

	
	/**
	 * @typedef {Object} Props
	 * @property {Release} release - Release entiy
	 */

	/** @type {Props} */
	let { release } = $props();
</script>

<style>
	.card-header-wrapper {
		background-color: var(--bs-primary);
		color: var(--bs-light);
	}
</style>

<Card>
	<div class="card-header-wrapper">
		<CardHeader>
			<CardTitle>{release.name}</CardTitle>
		</CardHeader>
	</div>
	<CardBody>
		<CardText>
			<SvelteMarkdown source={release.body} />
		</CardText>
		<CardText></CardText>
	</CardBody>
	<CardFooter
		><div>
			<div class="row">
				<div class="col">
					{$t('page.created-by')}: <a href={release.author.html_url}>{release.author.login}</a>
				</div>
				<div class="col">
					<p>{release.created_at}</p>
				</div>
			</div>
		</div></CardFooter
	>
</Card>



