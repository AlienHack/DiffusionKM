<script lang="ts">
	import type { km_category, km_content } from '@prisma/client';

	export let content: km_content & {
		km_category: km_category;
	};
</script>

<svelte:head>
	<title>Stable Diffusion Thailand KM | {content.title}</title>

	<meta property="og:type" content="article" />

	<meta property="title" content="Stable Diffusion Thailand KM | {content.title}" />

	<meta name="title" content="Stable Diffusion Thailand KM | {content.title}" />
	<meta name="description" content="{content.km_category.title} :: {content.content}" />
	<meta
		name="keywords"
		content="AI, Stable Diffusion, ความรู้, บทความ, เครื่องมือ, วิดีโอสอนใช้งาน, SD"
	/>

	<meta property="description" content="{content.km_category.title} :: {content.content}" />
	<meta property="og:title" content="Stable Diffusion Thailand KM | {content.title}" />
	<meta property="og:description" content="{content.km_category.title} :: {content.content}" />

	<meta
		property="og:image"
		content="https://blogs.code.productions/content/images/2023/03/Stable-Diffusion.jpeg"
	/>

	<meta property="article:publisher" content="https://www.facebook.com/code.productions.ready" />
	<meta property="twitter:title" content="Stable Diffusion Thailand KM | {content.title}" />
	<meta property="twitter:description" content="{content.km_category.title} :: {content.content}" />

	<meta
		property="twitter:image"
		content="https://blogs.code.productions/content/images/2023/03/Stable-Diffusion.jpeg"
	/>
</svelte:head>
