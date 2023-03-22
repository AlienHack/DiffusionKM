<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { ActionData, PageData } from './$types';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { onMount } from 'svelte';
	import { getColor, trimToLength } from '$lib/helpers';

	let submitting = false;

	export let data: PageData;

	onMount(() => {
		NProgress.configure({
			minimum: 0.16,
			showSpinner: false
		});
	});
</script>

<svelte:head>
	<title>Stable Diffusion Thailand KM</title>

	<meta property="og:type" content="article" />

	<meta property="title" content="Stable Diffusion Thailand KM" />

	<meta name="title" content="Stable Diffusion Thailand KM" />
	<meta name="description" content="แหล่งรวบรวมข้อมูลเกี่ยวกับ Stable Diffusion ในประเทศไทย" />
	<meta
		name="keywords"
		content="AI, Stable Diffusion, ความรู้, บทความ, เครื่องมือ, วิดีโอสอนใช้งาน, SD"
	/>

	<meta property="description" content="แหล่งรวบรวมข้อมูลเกี่ยวกับ Stable Diffusion ในประเทศไทย" />
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

<form
	action="?/create"
	method="post"
	use:enhance={() => {
		submitting = true;
		NProgress.start();
		return async ({ result, update }) => {
			submitting = false;

			if (result.type === 'success') {
				NProgress.done();
				goto('/');
			}
		};
	}}
>
	<div class="flex justify-center">
		<div class="card w-96 bg-base-200/30 shadow-xl">
			<div class="card-body">
				<h2 class="card-title prose prose-xl">รายงาน</h2>
				<p class="prose prose-base">
					ท่านกำลังรายงาน <span class="text-error">{data.content.title}</span>
				</p>
				<p class="prose prose-sm">รายงานการละเมิดลิขสิทธ์ สแปม หรือเนื้อหาที่ไม่เหมาะสม</p>
				<input type="hidden" name="content_id" bind:value={data.content.id} />
				<p class="prose prose-xl">หมวดหมู่<span class="text-error">*</span></p>
				<select class="select select-bordered w-full max-w-xs" required name="report_category">
					<option disabled selected value="">ระบุหมวดหมู่</option>
					<option value="ละเมิดลิขสิทธ์">ละเมิดลิขสิทธ์</option>
					<option value="ละเมิดลิขสิทธ์">เนื้อหาที่ไม่เหมาะสม</option>
					<option value="สแปม">สแปม</option>
					<option value="อื่นๆ">อื่นๆ</option>
				</select>
				<p class="prose prose-xl">รายละเอียดเบื้องต้น<span class="text-error">*</span></p>
				<textarea
					class="textarea textarea-bordered max-w-xs"
					placeholder="ระบุรายละเอียดเบื้องต้น เช่น รายงานการละเมิดลิขสิทธ์ สแปม หรือเนื้อหาที่ไม่เหมาะสม"
					name="description"
					required
				/>
				<p class="prose prose-xl">ผู้รายงาน</p>
				<input
					type="text"
					placeholder="ผู้รายงาน"
					class="input input-bordered w-full max-w-xs"
					name="author"
					required
				/>
				<div class="card-actions justify-end">
					<button class="btn btn-error" disabled={submitting}>ส่งรายงาน</button>
				</div>
			</div>
		</div>
	</div>
</form>

<div class="overflow-x-auto mt-4 w-full justify-center items-center mx-auto">
	<table class="table table-compact w-full">
		<thead>
			<tr>
				<th class="w-32">หมวดหมู่</th>
				<th>รายละเอียด</th>
				<th class="w-32">ผู้รายงาน</th>
			</tr>
		</thead>
		<tbody>
			{#each data.reports as report, i}
				<tr>
					<td
						><span class="badge badge-{getColor(report.title ?? 'default')}">{report.title}</span
						></td
					>
					<td>
						<p class="prose">{trimToLength(report.description ?? '', 100)}</p>
					</td>
					<td><p class="prose">{trimToLength(report.author ?? '', 30)}</p></td>
				</tr>
			{:else}
				<tr>
					<td colspan="3" class="text-center">ไม่พบรายงาน</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th>หมวดหมู่</th>
				<th>รายละเอียด</th>
				<th>ผู้รายงาน</th>
			</tr>
		</tfoot>
	</table>
</div>
