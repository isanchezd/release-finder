<script lang="ts">
	import SearchRepo from '../components/search-repo.svelte';
	import Releases from '../components/releases.svelte';
	import FilterForm from '../components/filter-form.svelte';
	import Spinner from '../components/spinner.svelte';
	import type { FormValues, Release } from '../types';

	import { splitUrl } from '../../../utils/url';
	import { isValidUrl, isDateBetweenInterval } from '../validators';
	import { getReleases } from '../repository';

	import { t } from '../../../i18n';

	let owner = $state('');
	let repo = $state('');

	let isLoading = $state(true);

	let showReleases = $state(false);

	let releases = $state<Release[]>([]);

	const onClick = (url: string): void => {
		if (!isValidUrl(url)) {
			return;
		}
		const urlSplitted = splitUrl(url);
		owner = urlSplitted[1];
		repo = urlSplitted[2];
		showReleases = true;
		fetchReleases(owner, repo);
	};

	const onClear = (): void => {
		owner = '';
		repo = '';
		releases = [];
		showReleases = false;
	};

	const fetchReleases = async (owner: string, repo: string): Promise<void> => {
		isLoading = true;
		try {
			releases = await getReleases(owner, repo);
		} catch (error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
	};

	const onSubmit = async (formValues: FormValues): Promise<void> => {
		await fetchReleases(owner, repo);
		const filteredReleases = releases.filter((release) => filterReleases(release, formValues));
		releases = [...filteredReleases];
	};

	const filterReleases = (release: Release, filter: FormValues): boolean => {
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

		return matchers.every((matcher) => matcher === true);
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
