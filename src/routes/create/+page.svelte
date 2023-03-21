<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Stable Diffusion Thailand KM</title>

	<meta property="og:type" content="article" />

	<meta property="title" content="Stable Diffusion Thailand KM" />

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

	<script src="https://js.hcaptcha.com/1/api.js" async defer></script>
</svelte:head>

<form
	action="?/create"
	method="post"
	use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				goto('/');
			}
		};
	}}
>
	<div class="flex justify-center">
		<div class="card w-96 bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title prose prose-xl">เพิ่มความรู้ใหม่</h2>
				<p class="prose prose-sm">
					โปรดค้นหาข้อมูลก่อนแบ่งปันความรู้ใหม่ๆ กันนะครับ จะได้ไม่มีข้อมูลซ้ำเยอะ :)
				</p>
				<p class="prose prose-xl">หมวดหมู่</p>
				<select class="select select-bordered w-full max-w-xs" required name="category_id">
					<option disabled selected value="">ระบุหมวดหมู่</option>
					{#each data.categories as category}
						<option value={category.id}>{category.title}</option>
					{/each}
				</select>
				<p class="prose prose-xl">หัวเรื่อง</p>
				<input
					type="text"
					placeholder="ระบุหัวเรื่อง เช่น วิธีการเทรนโมเดล"
					class="input input-bordered w-full max-w-xs"
					name="title"
					required
				/>
				<p class="prose prose-xl">รายละเอียดเบื้องต้น</p>
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
					required
				/>
				<p class="prose prose-xl">URL</p>
				<input
					type="text"
					placeholder="ระบุ URL เช่น https://www.google.co.th"
					class="input input-bordered w-full max-w-xs"
					name="link"
					required
				/>
				<div class="h-captcha" data-sitekey="06e72d3c-bb85-4ec4-b9c3-75f50ee7ac18" />
				<div class="card-actions justify-end">
					<button class="btn btn-primary">เพิ่มความรู้</button>
				</div>
			</div>
		</div>
	</div>
</form>
