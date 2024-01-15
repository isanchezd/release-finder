<script>
	import { Styles } from '@sveltestrap/sveltestrap';
	
	import Header from '../Common/components/Header.svelte';
	import Releases from '../Releases/views/FinderReleases.svelte';
	import Footer from '../Common/components/Footer.svelte';

	
</script>

<Styles />

<main class="d-flex flex-column min-vh-100">
	<Header />
	<Releases />
	<Footer />
</main>
