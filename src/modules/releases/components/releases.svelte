<script lang="ts">
	import Release from './release.svelte';
	import { Pagination, PaginationItem, PaginationLink } from '@sveltestrap/sveltestrap';
	import type { Release as ReleaseType } from '../types';

	type Props = {
		releases: ReleaseType[];
	};

	let { releases }: Props = $props();

	const LIMIT_PER_PAGE = 10;

	let currentPage = $state(1);

	const totalPages = $derived(Math.ceil(releases.length / LIMIT_PER_PAGE));

	const releasesFragment = $derived.by(() => {
		const initialSlice = currentPage * LIMIT_PER_PAGE - LIMIT_PER_PAGE;
		const endSlice = initialSlice + LIMIT_PER_PAGE;
		return releases.slice(initialSlice, endSlice);
	});

	const onClickFirstPage = (): void => {
		currentPage = 1;
	};

	const onClickPreviousPage = (): void => {
		if (currentPage > 1) {
			currentPage -= 1;
		}
	};

	const onClickNextPage = (): void => {
		if (currentPage < totalPages) {
			currentPage += 1;
		}
	};

	const onClickLastPage = (): void => {
		currentPage = totalPages;
	};
</script>

<div>
	{#each releasesFragment as release}
		<Release release={{ ...release, isLatest: releases.indexOf(release) === 0 }} />
	{/each}
	
	{#if totalPages > 1}
		<div class="d-flex justify-content-center mt-4">
			<Pagination size="sm">
				<PaginationItem disabled={currentPage === 1}>
					<PaginationLink first href="#" on:click={onClickFirstPage} />
				</PaginationItem>
				<PaginationItem disabled={currentPage === 1}>
					<PaginationLink previous href="#" on:click={onClickPreviousPage} />
				</PaginationItem>
				<PaginationItem active>
					<PaginationLink href="#">{currentPage}</PaginationLink>
				</PaginationItem>
				<PaginationItem disabled={currentPage === totalPages}>
					<PaginationLink next href="#" on:click={onClickNextPage} />
				</PaginationItem>
				<PaginationItem disabled={currentPage === totalPages}>
					<PaginationLink last href="#" on:click={onClickLastPage} />
				</PaginationItem>
			</Pagination>
		</div>
	{/if}
</div>
