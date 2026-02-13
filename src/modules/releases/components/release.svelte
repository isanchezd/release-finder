<script>
	import { Card, CardBody, CardHeader, CardTitle, Icon } from '@sveltestrap/sveltestrap';
	import SvelteMarkdown from 'svelte-markdown';

	/**
	 * @typedef Author
	 * @property {string} login
	 * @property {string} html_url
	 * @property {string} avatar_url
	 */

	/**
	 * @typedef Release
	 * @property {number} id
	 * @property {string} name
	 * @property {string} body
	 * @property {Author} author
	 * @property {string} created_at
	 * @property {string} html_url
	 * @property {boolean} [isLatest]
	 */

	/**
	 * @typedef {Object} Props
	 * @property {Release} release - Release entity
	 */

	/** @type {Props} */
	let { release } = $props();

	/**
	 * @description Format date to readable format
	 * @param {string} dateString
	 */
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).format(date);
	};

	/**
	 * @description Truncate description
	 * @param {string} text
	 */
	const truncateDescription = (text) => {
		if (!text) return '';
		const maxLength = 500;
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength) + '...';
	};
</script>

<Card class="shadow-sm border mb-3 hover-shadow">
	<CardHeader class="bg-transparent border-0 pb-2 pt-4 px-4">
		<div class="d-flex align-items-start justify-content-between gap-3">
			<div class="flex-fill min-w-0">
				<div class="d-flex align-items-center gap-2 mb-2">
					<CardTitle class="h6 fw-semibold mb-0 text-truncate">{release.name}</CardTitle>
					{#if release.isLatest}
						<span class="badge bg-primary small fw-medium">Latest</span>
					{/if}
				</div>
				<div class="d-flex align-items-center gap-3 small text-muted">
					<div class="d-flex align-items-center gap-2">
						<Icon name="calendar" style="font-size: 0.875rem;" />
						<span>{formatDate(release.created_at)}</span>
					</div>
					<div class="d-flex align-items-center gap-2">
						{#if release.author.avatar_url}
							<img
								src={release.author.avatar_url}
								alt={release.author.login}
								class="rounded-circle border"
								style="width: 20px; height: 20px;"
							/>
						{/if}
						<span class="fw-medium">{release.author.login}</span>
					</div>
				</div>
			</div>
			<a
				href={release.html_url}
				target="_blank"
				rel="noopener noreferrer"
				class="btn btn-outline-secondary btn-sm flex-shrink-0 small fw-medium"
			>
				<Icon name="box-arrow-up-right" class="me-1" style="font-size: 0.875rem;" />
				View
			</a>
		</div>
	</CardHeader>

	{#if release.body}
		<CardBody class="pt-2 px-4 pb-4">
			<div class="small text-muted release-body">
				<SvelteMarkdown source={truncateDescription(release.body)} />
			</div>
		</CardBody>
	{/if}
</Card>

<style>
	:global(.hover-shadow) {
		transition: all 0.2s ease;
	}
	:global(.hover-shadow:hover) {
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
		background-color: rgba(var(--bs-primary-rgb), 0.02);
	}
	:global(.release-body) {
		white-space: pre-wrap;
		word-wrap: break-word;
	}
	:global(.release-body p:last-child) {
		margin-bottom: 0;
	}
</style>



