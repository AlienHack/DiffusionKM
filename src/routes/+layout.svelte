<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.postcss';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';

	NProgress.configure({
		minimum: 0.16,
		showSpinner: false
	});

	$: {
		if ($navigating) {
			NProgress.start();
		} else NProgress.done();
	}
</script>

<Navbar />
<div class="m-auto mt-10 flex w-3/4 flex-col gap-3 mb-20">
	<slot />
</div>
