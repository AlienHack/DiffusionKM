<script lang="ts">
	import { goto } from '$app/navigation';
	import type { km_category } from '@prisma/client';

	export let categories: km_category[];

	let search = '';
	let category = '';

	function doSearch() {
		goto(`/?search=${search}&category_id=${category}`);
	}
</script>

<div class="grid grid-cols-4 gap-2">
	<input
		type="text"
		placeholder="ค้นหา"
		class="input input-bordered col-span-2"
		bind:value={search}
		on:keyup={(event) => {
			if (event.key === 'Enter') {
				doSearch();
			}
		}}
	/>
	<select class="select select-bordered col-span-2" bind:value={category}>
		<option selected value="">หมวดหมู่ทั้งหมด</option>
		{#each categories as category}
			<option value={category.id}>{category.title}</option>
		{/each}
	</select>
</div>
