<script lang="ts">
	import { goto } from '$app/navigation';
	import Flame from '$lib/components/Flame.svelte';
	import KnowledgeRow from '$lib/components/KnowledgeRow.svelte';
	import { getColor, nFormatter, trimToLength } from '$lib/helpers';
	import type { PageData } from './$types';

	let search = '';
	let category = '';

	function doSearch() {
		goto(`/?search=${search}&category_id=${category}`);
	}

	async function handleUpdateView({
		detail: { views, id }
	}: CustomEvent<{ views: number; id: string }>) {
		let content = data.contents.find((content) => content.id === id);
		if (content) {
			content.views = views;
			data.contents = data.contents;
		}
	}

	export let data: PageData;
</script>

<svelte:head>
	<title>Stable Diffusion Thailand KM</title>

	<meta property="og:type" content="article" />

	<meta property="title" content="Stable Diffusion Thailand KM" />

	<meta property="description" content="แหล่งรวบรวมข้อมูลเกี่ยวกับ Stable Diffusion ในประเทศไทย" />

	<meta name="title" content="Stable Diffusion Thailand KM" />
	<meta name="description" content="แหล่งรวบรวมข้อมูลเกี่ยวกับ Stable Diffusion ในประเทศไทย" />
	<meta
		name="keywords"
		content="AI, Stable Diffusion, ความรู้, บทความ, เครื่องมือ, วิดีโอสอนใช้งาน, SD"
	/>

	<meta property="og:title" content="Stable Diffusion Thailand KM" />
	<meta
		property="og:description"
		content="แหล่งรวบรวมข้อมูลเกี่ยวกับ Stable Diffusion ในประเทศไทย"
	/>

	<meta
		property="og:image"
		content="https://blogs.code.productions/content/images/2023/03/Stable-Diffusion.jpeg"
	/>

	<meta property="article:publisher" content="https://www.facebook.com/code.productions.ready" />
	<meta property="twitter:title" content="Stable Diffusion Thailand KM" />
	<meta
		property="twitter:description"
		content="แหล่งรวบรวมข้อมูลเกี่ยวกับ Stable Diffusion ในประเทศไทย"
	/>

	<meta
		property="twitter:image"
		content="https://blogs.code.productions/content/images/2023/03/Stable-Diffusion.jpeg"
	/>
</svelte:head>

<div class="flex flex-col justify-center items-center mb-4">
	<h1 class="prose text-4xl hover:text-cyan-600 transition-all duration-300">
		Stable Diffusion Thailand Knowledge Portal
	</h1>
	<h3 class="prose text-xl mt-2 hover:text-cyan-600 transition-all duration-300">
		แหล่งรวบรวมข้อมูลความรู้เกี่ยวกับ Stable Diffusion
	</h3>
</div>

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
		{#each data.categories as category}
			<option value={category.id}>{category.title}</option>
		{/each}
	</select>
</div>

<div class="overflow-x-auto w-full">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th><span class="ml-2">#</span></th>
				<th>หมวดหมู่</th>
				<th>หัวเรื่อง</th>
				<th>วันที่</th>
				<th>ผู้เขียน</th>
				<th class="flex justify-center"
					><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z"
						/></svg
					></th
				>
				<th class=""
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 21 21"
						class="ml-14"
						><g
							fill="none"
							fill-rule="evenodd"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path
								d="m10.5 15.429l3.548 1.837a1 1 0 0 0 .907.006l2.992-1.496a1 1 0 0 0 .553-.894v-2.764a1 1 0 0 0-.553-.894L14.5 9.5l-3.46 1.792a1 1 0 0 0-.54.888v3.249z"
							/><path
								d="m3.04 15.708l3.008 1.558a1 1 0 0 0 .907.006L10.5 15.5v-3.382a1 1 0 0 0-.553-.894L6.5 9.5l-3.46 1.792a1 1 0 0 0-.54.888v2.64a1 1 0 0 0 .54.888zM6.5 9.429l3.548 1.837a1 1 0 0 0 .907.006L14.5 9.5V6.118a1 1 0 0 0-.553-.894l-2.992-1.496a1 1 0 0 0-.907.006L7.04 5.292a1 1 0 0 0-.54.888v3.249z"
							/><path
								d="m6.846 5.673l3.207 1.603a1 1 0 0 0 .894 0L14.12 5.69h0M8.799 4.649L12.5 6.5m.299 4.149L16.5 12.5M4.799 10.649L8.5 12.5m2.346-.827l3.207 1.603a1 1 0 0 0 .894 0l3.172-1.586h0m-15.273-.017l3.207 1.603a1 1 0 0 0 .894 0l3.172-1.586h0M10.5 7.5v4m4 2V17m-8-3.5V17"
							/></g
						></svg
					></th
				>
			</tr>
		</thead>
		<tbody>
			{#each data.contents as content}
				<KnowledgeRow {content} on:updateView={handleUpdateView} />
			{:else}
				<tr>
					<td colspan="7" class="text-center">ไม่พบข้อมูล</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="7" />
			</tr>
		</tfoot>
	</table>
</div>

<div class="w-full">
	<div class="btn-group mt-4 flex-wrap gap-y-2">
		{#each Array.from({ length: data.totalPage }, (_, i) => i + 1) as number}
			<a
				href="/?search={search}&category_id={category}&limit=15&page={number}"
				class="btn btn-sm {data.page === number ? 'btn-active' : ''}">{number}</a
			>
		{/each}
	</div>
</div>
