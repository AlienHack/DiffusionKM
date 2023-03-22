<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { ActionData, PageData } from './$types';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import { onMount } from 'svelte';
	import StaticMetaHeader from '$lib/components/StaticMetaHeader.svelte';

	let submitting = false;

	export let data: PageData;

	onMount(() => {
		NProgress.configure({
			minimum: 0.16,
			showSpinner: false
		});
	});
</script>

<StaticMetaHeader />

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
				<h2 class="card-title prose prose-xl">เพิ่มความรู้ใหม่</h2>
				<p class="prose prose-sm">
					โปรดค้นหาข้อมูลก่อนแบ่งปันความรู้ใหม่ๆ กันนะครับ จะได้ไม่มีข้อมูลซ้ำเยอะ :)
				</p>
				<p class="prose prose-xl">หมวดหมู่<span class="text-error">*</span></p>
				<select class="select select-bordered w-full max-w-xs" required name="category_id">
					<option disabled selected value="">ระบุหมวดหมู่</option>
					{#each data.categories as category}
						<option value={category.id}>{category.title}</option>
					{/each}
				</select>
				<p class="prose prose-xl">หัวเรื่อง<span class="text-error">*</span></p>
				<input
					type="text"
					placeholder="ระบุหัวเรื่อง เช่น วิธีการเทรนโมเดล"
					class="input input-bordered w-full max-w-xs"
					name="title"
					required
				/>
				<p class="prose prose-xl">รายละเอียดเบื้องต้น<span class="text-error">*</span></p>
				<textarea
					class="textarea textarea-bordered max-w-xs"
					placeholder="ระบุรายละเอียดเบื้องต้น เช่น การเทรนโมเดลด้วย LoRA"
					name="content"
					required
				/>
				<p class="prose prose-xl">ผู้เขียนบทความ</p>
				<input
					type="text"
					placeholder="ระบุผู้เขียนบทความ"
					class="input input-bordered w-full max-w-xs"
					name="author"
				/>
				<p class="prose prose-xl">URL<span class="text-error">*</span></p>
				<input
					type="text"
					placeholder="ระบุ URL เช่น https://www.google.co.th"
					class="input input-bordered w-full max-w-xs"
					name="link"
					required
				/>
				<div class="card-actions justify-end">
					<button class="btn btn-primary" disabled={submitting}>เพิ่มความรู้</button>
				</div>
			</div>
		</div>
	</div>
</form>
