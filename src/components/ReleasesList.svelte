<script>
	import Release from './Release.svelte';

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
	 * Releases Collection
	 * @type {Release[]}
	 */
	export let releases;
</script>

{#each releases as release}
	<div class="row mb-4 mt-4">
		<div class="col">
			<Release {release} />
		</div>
	</div>
{/each}
