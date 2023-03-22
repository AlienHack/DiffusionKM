<script>
	import HeaderCaption from '$lib/components/HeaderCaption.svelte';
	import StaticMetaHeader from '$lib/components/StaticMetaHeader.svelte';
</script>

<StaticMetaHeader />

<div class="flex justify-center">
	<div class="card w-full bg-base-200/30 shadow-xl">
		<div class="card-body">
			<h2 class="card-title prose">เกี่ยวกับ</h2>
			<p class="ml-4">เว็บไซต์นี้สร้างขึ้นเพื่อเป็นแหล่งข้อมูลการค้นหา และจัดทำ Stable Diffusion</p>
			<p class="prose prose-xl font-bold">Projects</p>
			<ul class="prose ml-4">
				<li>
					<a href="https://sdkm.code.productions">Stable Diffusion KM</a>
				</li>
				<li>
					<a href="https://content.code.productions" target="_blank">Blogs</a>
				</li>
				<li>
					<a href="https://fiction.code.productions" target="_blank">Fictionlog Downloader</a>
				</li>
				<li>
					<a href="https://www.facebook.com/code.productions.ready" target="_blank"
						>Code.Productions</a
					>
				</li>
			</ul>
		</div>
	</div>
</div>
