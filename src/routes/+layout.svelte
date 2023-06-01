<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar, Avatar, Drawer, drawerStore, LightSwitch } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/navigation.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Login from '$lib/components/login.svelte';
	import { onMount } from 'svelte';

	function drawerOpen(): void {
		drawerStore.open();
	}
	let isMobile = false;

	function checkMobile() {
	isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed
	}
	onMount(() => {
		checkMobile();
	});

	$: containerPaddingClass = isMobile ? 'p-1' : 'p-10';
</script>

<Drawer>
	<Login />
	<Navigation />
</Drawer>

<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="md:hidden btn btn-sm mr-4">
					<span>
						<svg viewBox="0 0 100 80" class="fill-token w-4 h-4" on:click={drawerOpen} on:keypress={drawerOpen}>
							<rect width="100" height="20" />
							<rect y="30" width="100" height="20" />
							<rect y="60" width="100" height="20" />
						</svg>
					</span>
				</button>
				<strong class="text-xl p-6">River Dipper</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
				<Avatar class="w-9" initials="A" background="bg-primary-500" />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Login />
		<Navigation />
		
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
	</svelte:fragment>
	<svelte:fragment slot="pageHeader"></svelte:fragment>
	<!-- Router Slot -->
	<div class="container {containerPaddingClass} mx-auto">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter"></svelte:fragment>
	<svelte:fragment slot="footer">
		<Footer />
	</svelte:fragment>
</AppShell>
