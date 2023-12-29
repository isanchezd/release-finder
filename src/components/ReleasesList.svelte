<script>
	import Release from './Release.svelte';
	import { Pagination, PaginationItem, PaginationLink } from '@sveltestrap/sveltestrap';

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
	  * @typedef Pagination
	  * @property {number} currentPage
	  * @property {number} totalPages
	 */

	/**
	 * @description Releases Collection
	 * @type {Release[]}
	 */
	export let releases;


	/**
	 * @description Releases Collection
	 * @type {number}
	 */
	const LIMIT_PER_PAGE = 10

	/**
	 * @description Releases Collection
	 * @type {Pagination}
	 */
	const PAGINATION_INITIAL_STATE = {
		currentPage: 1,
		totalPages: Math.round(releases.length / LIMIT_PER_PAGE)
	}

	/**
	 * @description Releases Collection
	 * @type {Release[]}
	 */
	let releasesFragment


	/**
	 * @descrption Releases Collection
	 * @type {Pagination}
	 */
	let pagination = {...PAGINATION_INITIAL_STATE}


	/**
	 * @description Svelte Reactive flow
	*/
	$: {
		const initialSlice = (pagination.currentPage * LIMIT_PER_PAGE) - LIMIT_PER_PAGE
		const endSlice =  initialSlice + LIMIT_PER_PAGE
		releasesFragment = releases.slice(initialSlice, endSlice)
	}

	/**
	 * @description Method to go first page
	 */
	const onClickFirstPage = () => {
		pagination.currentPage = 1
	}

	/**
	 * @description Method to go to the previous page
	 */
	const onClickPreviousPage = () => {
		if (pagination.currentPage > 1) {
			pagination.currentPage -= 1
		}  
	}

	/**
	 * @description Method to go to the next page
	 */
	const onClickNextPage = () => {
		if (pagination.currentPage < pagination.totalPages) {
			pagination.currentPage += 1
		}
	}

	/**
	 * @description Method to go to the last page
	 */
	const onClickLastPage = () => {
		pagination.currentPage = pagination.totalPages
	}
</script>

<div>
	{#each releasesFragment as release}
		<div class="row mb-4 mt-4">
			<div class="col">
				<Release {release} />
			</div>
		</div>
	{/each}
	<div class="row">
		<div class="d-flex justify-content-center">
			<Pagination size="sm">
				<PaginationItem>
					<PaginationLink first href="#" on:click={onClickFirstPage} />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink previous href="#"on:click={onClickPreviousPage} />
				</PaginationItem>
				<PaginationItem active>
					<PaginationLink href="#">{pagination.currentPage}</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink next href="#" on:click={onClickNextPage} />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink last href="#" on:click={onClickLastPage} />
				</PaginationItem>
			</Pagination>
		</div>
	</div>
</div>
