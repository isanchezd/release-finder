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
	 * Release entiy
	 * @type {Release}
	 */
	export let release;
</script>

<Card>
	<CardHeader>
		<CardTitle>{release.name}</CardTitle>
	</CardHeader>
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
					Created by: <a href={release.author.html_url}>{release.author.login}</a>
				</div>
				<div class="col">
					<p>{release.created_at}</p>
				</div>
			</div>
		</div></CardFooter
	>
</Card>
