<script lang="ts">
	import { goto } from '$app/navigation';
	import Flame from '$lib/components/Flame.svelte';
	import { getColor, nFormatter, trimToLength } from '$lib/helpers';
	import type { PageData } from './$types';

	let search = '';
	let category = '';

	function doSearch() {
		goto(`/?search=${search}&category_id=${category}`);
	}

	async function updateView(id: string) {
		let request = await fetch(`/api/update-view/${id}`, {
			method: 'POST'
		});

		let result = await request.json();
		if (result.success) {
			// Update view
			let content = data.contents.find((content) => content.id === id);
			if (content) {
				content.views = result.views;
				data.contents = data.contents;
			}
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
				<tr>
					<th>
						{#if content.link?.includes('facebook')}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
								/></svg
							>
						{:else if content.link?.includes('youtube')}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M2.5 4.5h19c.84 0 1.5.65 1.5 1.5v11.5c0 .85-.66 1.5-1.5 1.5h-19c-.85 0-1.5-.65-1.5-1.5V6c0-.85.65-1.5 1.5-1.5m7.21 4V15l5.71-3.3l-5.71-3.2M17.25 21H6.65c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h10.7c.3 0 .5.2.5.5s-.3.5-.6.5Z"
								/></svg
							>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M16.36 14c.08-.66.14-1.32.14-2c0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2c0-.68.06-1.35.16-2h4.68c.09.65.16 1.32.16 2c0 .68-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.923 7.923 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8.008 8.008 0 0 1 5.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2c0 .68.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.65 15.65 0 0 0-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
								/></svg
							>{/if}</th
					>
					<td>
						<span class="badge badge-{getColor(content.km_category.title ?? 'default')}"
							>{content.km_category.title}</span
						>
					</td>
					<td>
						<a
							href={content.link}
							target="_blank"
							rel="nofollow noreferer noopener"
							on:click={() => {
								updateView(content.id);
							}}
							><div class="flex items-center space-x-3">
								<div
									class="hover:cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:transition-all"
								>
									<div class="font-bold prose ">
										{content.title}
									</div>
									<div class="text-sm opacity-50 prose prose-sm">
										{content.content}
									</div>
								</div>
							</div></a
						>
					</td>
					<td>
						{content.created_at
							? new Date(content.created_at).toLocaleDateString('th-TH', {
									year: 'numeric',

									month: 'long',

									day: 'numeric'
							  })
							: ''}
					</td>
					<td>
						{trimToLength(content.author ?? '', 15)}
					</td>
					<td class="text-center">{nFormatter(content.views ?? 0, 1)}</td>
					<td class="prose">
						<a
							href="/{content.id}"
							on:click={() => {
								updateView(content.id);
							}}>รายละเอียด</a
						>
						|
						<a
							class="text-error"
							href="/report/{content.id}"
							on:click={() => {
								updateView(content.id);
							}}>รายงาน</a
						>
					</td>
				</tr>
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
