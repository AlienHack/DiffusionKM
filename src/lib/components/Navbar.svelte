<script>
	import { page } from '$app/stores';
</script>

<div class="navbar bg-base-100 mt-2">
	<div class="navbar-start">
		<div class="dropdown">
			<span tabindex="-1" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</span>
			<ul
				tabindex="-1"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li class="active">
					<a href="/" class={$page.url.pathname === '/' ? 'active' : ''}>หน้าหลัก</a>
				</li>
				<li>
					<a href="/about" class={$page.url.pathname === '/about' ? 'active' : ''}>เกี่ยวกับ</a>
				</li>
			</ul>
		</div>
		<a href="/" class="btn btn-ghost normal-case text-xl">SD Thailand KM</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/" class={$page.url.pathname === '/' ? 'active' : ''}>หน้าหลัก</a></li>
			<li>
				<a href="/about" class={$page.url.pathname === '/about' ? 'active' : ''}>เกี่ยวกับ</a>
			</li>
		</ul>
	</div>
	<div class="navbar-end">
		<a href="/create" class="btn">เพิ่มความรู้</a>
	</div>
</div>
