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
	import Dipperlogo from '$lib/components/dipperlogo.svelte';
	import Namelogo from '$lib/components/namelogo.svelte';

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
	$: slotdisplay = isMobile ? 'collapse' : '';
</script>

<Drawer>
	<Login />
	<Navigation />
</Drawer>

<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10">
	<svelte:fragment slot="header">
		<AppBar padding="pr-12 pl-12" gap="g-0" >
			<svelte:fragment slot="lead">
				<button class="md:hidden btn btn-sm mr-3">
					<span>
						<svg viewBox="0 0 100 80" class="fill-token w-4 h-4" on:click={drawerOpen} on:keypress={drawerOpen}>
							<rect width="100" height="20" />
							<rect y="30" width="100" height="20" />
							<rect y="60" width="100" height="20" />
						</svg>
					</span>
				</button>
				<Namelogo />
				<h1 class="hidetitle">River Dipper Application</h1>

			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="{slotdisplay}">
				<Dipperlogo />
				</div>
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
	<div class="container {containerPaddingClass} mx-auto ">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter"></svelte:fragment>
	<svelte:fragment slot="footer">
		<AppBar padding="p-0 pl-8 pr-8">
			<svelte:fragment slot="lead">
				<Footer />
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<p class="pr-2">LightSwitch:</p>
				<LightSwitch rounded="rounded-xl" width="w-12"/>
			</svelte:fragment>
		</AppBar>
		<!-- <Footer />
		<LightSwitch rounded="rounded-xl" width="w-12"/> -->
	</svelte:fragment>
</AppShell>

<style>
	.hidetitle {
		opacity: 0;
	}

</style>