<script>
	import { Styles } from '@sveltestrap/sveltestrap';
	import SearchRepo from '../components/SearchRepo.svelte';
	import ReleasesList from '../components/ReleasesList.svelte';
	import { isValidUrl, splitUrl, isDateBetweenInterval } from '../helpers';
	import { getReleases } from '../repository';
	import FilterForm from '../components/FilterForm.svelte';

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
	 * @property {string} string
	 * @property {Author} author
	 * @property {string} created_at
	 */

	/**
	 * @typedef FormValues
	 * @property {string} version
	 * @property {string} from
	 * @property {string} to
	 * @property {string} description
	 * @property {string} author
	 */

	/**
	 *
	 * @type string
	 */
	let owner;

	/**
	 *
	 * @type string
	 */
	let repo;

	/**
	 *
	 * @type boolean
	 */
	let loading = true;

	/**
	 *
	 * @type boolean
	 */
	let showReleases = false;

	/**
	 *
	 * @type { Release[] }
	 */
	let releases = [];

	/**
	 * @description On Input event
	 * @param {Event & {target: HTMLInputElement}} event
	 */
	const onInput = (event) => {
		const url = event.target ? event.target.value : '';
		fetchReleases(url);
	};

	/**
	 * @description On Input event
	 * @param {string} url
	 */

	const fetchReleases = async (url) => {
		showReleases = false;
		if (!isValidUrl(url)) {
			return;
		}

		const urlSplitted = splitUrl(url);
		owner = urlSplitted[1];
		repo = urlSplitted[2];

		try {
			releases = await getReleases(owner, repo);
			showReleases = true;
		} catch (err) {
			console.error('Error getting Releases');
		} finally {
			loading = false;
		}
	};

	/**
	 * @description onSubmit function to handle the user´s click action on filter button
	 * @param {FormValues} formValues
	 */

	const onSubmit = async (formValues) => {
		loading = true;
		releases = await getReleases(owner, repo);

		const filteredReleases = releases.filter((release) => filterReleases(release, formValues));

		releases = [...filteredReleases];
		loading = false;
	};

	/**
	 *
	 * @param { Release } release
	 * @param { FormValues } filter
	 */

	const filterReleases = (release, filter) => {
		/**
		 * @type {boolean[]}
		 */
		const matchers = [];

		if (filter.version) {
			matchers.push(release.name.includes(filter.version));
		}

		if (filter.from || filter.to) {
			matchers.push(isDateBetweenInterval(release.created_at, filter.from, filter.to));
		}

		if (filter.description) {
			matchers.push(release.body.includes(filter.description));
		}

		if (filter.author) {
			matchers.push(release.author.login.includes(filter.author));
		}

		const isMatch = matchers.every((matcher) => matcher === true);

		if (isMatch) {
			return release;
		}
	};
</script>

<Styles />

<main class="d-flex flex-column min-vh-100">
	<header class="border-bottom">
		<h1>Release Finder</h1>
	</header>
	<br />
	<section class="flex-grow-1">
		<div class="container">
			<div class="row">
				<div class="col">
					<SearchRepo {onInput} />
				</div>
			</div>

			{#if showReleases}
				<div class="row">
					<div class="col mt-2">
						<FilterForm {onSubmit} />
					</div>
				</div>

				{#if loading}
					<p>loading...</p>
				{:else if releases.length > 0}
					<ReleasesList {releases} />
				{:else}
					<p>No hay releases con esos criterios</p>
				{/if}
			{/if}
		</div>
	</section>
	<footer class="border-top">
		<p class="text-center">By Iván Sánchez Díaz</p>
	</footer>
</main>
