<script>
    import SearchRepo from '../components/SearchRepo.svelte';
	import Releases from '../components/Releases.svelte';
	import FilterForm from '../components/FilterForm.svelte';
	import Spinner from '../components/Spinner.svelte';

    import { splitUrl } from '../helpers';
	import { isValidUrl,  isDateBetweenInterval } from '../validators';
	import { getReleases } from '../repository';


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
	let isLoading = true;

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
	 * @param {string} url
	 */
	const onClick = (url) => {
		if (!isValidUrl(url)) {
			return;
		}
		const urlSplitted = splitUrl(url);
		owner = urlSplitted[1];
		repo = urlSplitted[2];
		showReleases = true;
		fetchReleases(owner, repo);
	};

	/**
	 * @description On Input event
	 * @param {string} owner,
	 * @param {string} repo
	 */

	const fetchReleases = async (owner, repo) => {
		isLoading = true
		try {
			releases = await getReleases(owner, repo);
		} catch (err) {
			console.log(err);
		} finally {
			isLoading = false;
		}
	};

	/**
	 * @description onSubmit function to handle the user´s click action on filter button
	 * @param {FormValues} formValues
	 */

	const onSubmit = async (formValues) => {
		await fetchReleases(owner, repo);
		const filteredReleases = releases.filter((release) => filterReleases(release, formValues));
		releases = [...filteredReleases];
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



<section class="flex-grow-1">
		<div class="container">
			<div class="row">
				<div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
					<SearchRepo {onClick} />
				</div>
			</div>

			{#if showReleases}
				<div class="row">
					<div class="col mt-2">
						<FilterForm {onSubmit} />
					</div>
				</div>

				{#if isLoading}
					<Spinner />
				{:else if releases.length > 0}
					<Releases {releases} />
				{:else}
					<p>{$t('page.no-results')}</p>
				{/if}
			{/if}
		</div>
	</section>