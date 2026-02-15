<script lang="ts">
	import { Card, CardBody, CardHeader, CardTitle, Icon } from '@sveltestrap/sveltestrap';
	import SvelteMarkdown from 'svelte-markdown';
	import type { Release } from '../types';

	type Props = {
		release: Release;
	};

	let { release }: Props = $props();

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).format(date);
	};

	const truncateDescription = (text: string): string => {
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



