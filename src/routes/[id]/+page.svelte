<script lang="ts">
	import { trimToLength } from '$lib/helpers';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Stable Diffusion Thailand KM | {data.content.title}</title>

	<meta property="og:type" content="article" />

	<meta property="title" content="Stable Diffusion Thailand KM | {data.content.title}" />

	<meta
		property="description"
		content="{data.content.km_category.title} :: {data.content.content}"
	/>
	<meta property="og:title" content="Stable Diffusion Thailand KM | {data.content.title}" />
	<meta
		property="og:description"
		content="{data.content.km_category.title} :: {data.content.content}"
	/>

	<meta
		property="og:image"
		content="https://blogs.code.productions/content/images/2023/03/Stable-Diffusion.jpeg"
	/>

	<meta property="article:publisher" content="https://www.facebook.com/code.productions.ready" />
	<meta property="twitter:title" content="Stable Diffusion Thailand KM | {data.content.title}" />
	<meta
		property="twitter:description"
		content="{data.content.km_category.title} :: {data.content.content}"
	/>

	<meta
		property="twitter:image"
		content="https://blogs.code.productions/content/images/2023/03/Stable-Diffusion.jpeg"
	/>
</svelte:head>

<div class="flex justify-center">
	<div class="card w-1/2 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title justify-center">
				<span class="prose text-xl font-bold">{data.content.km_category.title}</span>
			</h2>

			<p class="prose prose-xl font-bold">หัวเรื่อง</p>
			<p class="prose ml-4">{data.content.title}</p>
			<p class="prose prose-xl font-bold">รายละเอียดเบื้องต้น</p>
			<p class="prose ml-4">{data.content.content}</p>
			<p class="prose prose-xl font-bold">Website</p>
			<p class="prose ml-4">
				<a href={data.content.link} target="_blank" rel="nofollow noreferer noopener"
					>{trimToLength(data.content.link ?? '', 50)}</a
				>
			</p>
		</div>
	</div>
</div>
