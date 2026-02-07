<script>
	import { Styles } from '@sveltestrap/sveltestrap';
	
	import Header from '../components/Header.svelte';
	import Releases from '../modules/releases/views/finder-releases.svelte';
	import Footer from '../components/footer.svelte';

	
</script>

<Styles />

<main class="d-flex flex-column min-vh-100">
	<Header />
	<Releases />
	<Footer />
</main>
