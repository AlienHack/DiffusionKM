<script lang="ts">
	import { getColor, trimToLength } from '$lib/helpers';
	import type { PageData } from './$types';
	import DOMPurify from 'isomorphic-dompurify';
	import DynamicMetaHeader from '$lib/components/DynamicMetaHeader.svelte';

	export let data: PageData;
</script>

<DynamicMetaHeader content={data.content} />

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
				<a href={data.content.link} target="_blank" rel="nofollow noreferrer noopener"
					>{trimToLength(data.content.link ?? '', 50)}</a
				>
			</pre>
		</div>
	</div>
</div>
