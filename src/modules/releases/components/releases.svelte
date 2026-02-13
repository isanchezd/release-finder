<script>
	import Release from './release.svelte';
	import { Pagination, PaginationItem, PaginationLink } from '@sveltestrap/sveltestrap';

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
	 */

	/**
	 * @typedef Pagination
	 * @property {number} currentPage
	 * @property {number} totalPages
	 */

	
	/**
	 * @typedef {Object} Props
	 * @property {Release[]} releases
	 */

	/** @type {Props} */
	let { releases } = $props();

	/**
	 * @description Releases Collection
	 * @type {number}
	 */
	const LIMIT_PER_PAGE = 10;

	/**
	 * @description Current page state
	 * @type {number}
	 */
	let currentPage = $state(1);

	/**
	 * @description Total pages calculated reactively from releases length
	 * @type {number}
	 */
	const totalPages = $derived(Math.ceil(releases.length / LIMIT_PER_PAGE));

	/**
	 * @description Releases fragment calculated reactively for current page
	 * @type {Release[]}
	 */
	const releasesFragment = $derived.by(() => {
		const initialSlice = currentPage * LIMIT_PER_PAGE - LIMIT_PER_PAGE;
		const endSlice = initialSlice + LIMIT_PER_PAGE;
		return releases.slice(initialSlice, endSlice);
	});

	/**
	 * @descrption Pagination object for easier access
	 * @type {Pagination}
	 */
	const pagination = $derived({
		currentPage,
		totalPages
	});

	/**
	 * @description Method to go first page
	 */
	const onClickFirstPage = () => {
		currentPage = 1;
	};

	/**
	 * @description Method to go to the previous page
	 */
	const onClickPreviousPage = () => {
		if (currentPage > 1) {
			currentPage -= 1;
		}
	};

	/**
	 * @description Method to go to the next page
	 */
	const onClickNextPage = () => {
		if (currentPage < totalPages) {
			currentPage += 1;
		}
	};

	/**
	 * @description Method to go to the last page
	 */
	const onClickLastPage = () => {
		currentPage = totalPages;
	};
</script>

<div>
	{#each releasesFragment as release, index}
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
					<PaginationLink href="#">{pagination.currentPage}</PaginationLink>
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
