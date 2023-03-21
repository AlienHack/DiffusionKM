<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.postcss';
</script>

<Navbar />
<div class="m-auto mt-10 flex w-3/4 flex-col gap-3 ">
	<slot />
</div>
