<script>
	import SearchRepo from '../components/search-repo.svelte';
	import Releases from '../components/releases.svelte';
	import FilterForm from '../components/filter-form.svelte';
	import Spinner from '../components/spinner.svelte';

	import { splitUrl } from '../../../utils/url';
	import { isValidUrl, isDateBetweenInterval } from '../validators';
	import { getReleases } from '../repository';

	import { t } from '../../../i18n';

	/**
	 * @typedef Author
	 * @property {string} login
	 * @property { string } html_url
	 * @property { string } avatar_url
	 */

	/**
	 * @typedef Release
	 * @property {number} id
	 * @property {string} name
	 * @property {string} body
	 * @property {string} string
	 * @property {Author} author
	 * @property {string} created_at
	 * @property {string} html_url
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
	let isLoading = $state(true);

	/**
	 *
	 * @type boolean
	 */
	let showReleases = $state(false);

	/**
	 *
	 * @type { Release[] }
	 */
	let releases = $state([]);

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
	 * @description Reset search and releases state
	 */
	const onClear = () => {
		owner = '';
		repo = '';
		releases = [];
		showReleases = false;
	};

	/**
	 * @description On Input event
	 * @param {string} owner,
	 * @param {string} repo
	 */

	const fetchReleases = async (owner, repo) => {
		isLoading = true;
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
	<div class="container py-5">
		<div class="row justify-content-center">
			<div class="col-12 col-lg-10 col-xl-8">
				<!-- Header Section -->
				<div class="text-center mb-5">
					<div class="d-flex align-items-center justify-content-center gap-3 mb-4">
						<h1 class="display-4 fw-semibold">Release Finder</h1>
					</div>
					<p class="lead text-muted mx-auto" style="max-width: 42rem;">
						Discover and track GitHub releases effortlessly. Enter any repository URL to explore its
						release history and stay updated with the latest versions.
					</p>
				</div>

				<!-- Search Section -->
				<div class="card shadow-sm border mb-4">
					<div class="card-body p-4">
						<SearchRepo {onClick} {onClear} />
					</div>
				</div>

				{#if showReleases}
					<!-- Filter Section -->
					<div class="card shadow-sm border mb-4">
						<div class="card-body p-4">
							<FilterForm {onSubmit} />
						</div>
					</div>

					<!-- Loading State -->
					{#if isLoading}
						<Spinner />
					{:else if releases.length > 0}
						<!-- Releases List -->
						<div class="mb-4">
							<h2 class="h5 fw-semibold mb-4 d-flex align-items-center gap-2">
								<span>Releases ({releases.length})</span>
							</h2>
							<Releases {releases} />
						</div>
					{:else}
						<!-- No Results -->
						<div class="card border bg-light">
							<div class="card-body p-5 text-center">
								<h3 class="h6 fw-semibold mb-2">{$t('page.no-results')}</h3>
								<p class="small text-muted mb-0">Try adjusting your search criteria.</p>
							</div>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>
</section>
