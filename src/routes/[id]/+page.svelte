<script lang="ts">
	import { getColor, trimToLength } from '$lib/helpers';
	import type { PageData } from './$types';
	import DOMPurify from 'isomorphic-dompurify';

	export let data: PageData;
</script>

<svelte:head>
	<title>Stable Diffusion Thailand KM | {data.content.title}</title>

	<meta property="og:type" content="article" />

	<meta property="title" content="Stable Diffusion Thailand KM | {data.content.title}" />

	<meta name="title" content="Stable Diffusion Thailand KM | {data.content.title}" />
	<meta name="description" content="{data.content.km_category.title} :: {data.content.content}" />
	<meta
		name="keywords"
		content="AI, Stable Diffusion, ความรู้, บทความ, เครื่องมือ, วิดีโอสอนใช้งาน, SD"
	/>

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
	<div class="card w-full lg:w-4/5 xl:w-2/3 bg-base-200/30 shadow-xl">
		<div class="card-body">
			<h2 class="card-title justify-center">
				<span
					class="prose text-xl font-bold badge badge-{getColor(
						data.content.km_category.title ?? 'default'
					)} py-5 px-5">{data.content.km_category.title}</span
				>
			</h2>

			<p class="prose prose-xl font-bold">หัวเรื่อง</p>
			<pre class="prose whitespace-pre-line px-4 text-justify">
				<span>{data.content.title}</span>
			</pre>
			<p class="prose prose-xl font-bold">รายละเอียดเบื้องต้น</p>
			<pre class="prose whitespace-pre-line px-4 text-justify max-w-full">
				<span>{@html DOMPurify.sanitize(data.content.content ?? '')}</span>
			</pre>
			<p class="prose prose-xl font-bold">Website</p>
			<pre class="prose whitespace-pre-line px-4 text-justify">
				<a href={data.content.link} target="_blank" rel="nofollow noreferer noopener"
					>{trimToLength(data.content.link ?? '', 50)}</a
				>
			</pre>
		</div>
	</div>
</div>
