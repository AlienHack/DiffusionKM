<script lang="ts">
	import { getColor, nFormatter, trimToLength } from '$lib/helpers';
	import type { km_category, km_content } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let content: km_content & {
		km_category: km_category;
	};

	async function updateView(id: string) {
		let request = await fetch(`/api/update-view/${id}`, {
			method: 'POST'
		});

		let result = await request.json();
		if (result.success) {
			dispatch('updateView', {
				id: id,
				views: result.views
			});
		}
	}
</script>

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
