<script lang="ts">
	import Newslettersignup from "$lib/components/Newslettersignup.svelte";
	import Seohomepage from "$lib/components/seohomepage.svelte";

</script>
<Seohomepage 
	title="River Dipper" 
	description="Your home for fast and customizable river flows, forecasting, and community!" 
	keywords="river, flow, forecast, community, whitewater, kayaking, rafting, canoeing, paddleboarding, SUP, forum, guage, hydrograph"
	type="WebSite"
	canonical="https://river.dipper.pro"
	/>

<div class="container logobackground">
	<div class="p-4 textbackground">
	<div class="container w-full mx-auto flex">
		<h1 class="p-4">Welcome to River Dipper</h1>
	</div>
    <hr class="!border-t-4" />
    <h2 class="p-4 ">Your home for fast and customizable river flows, forecasting, and community!</h2>
	<hr class="!border-t-4" />
    <h3 class="p-4 ">Sign up for our newsletter to learn about the latest available features!</h3>
	<div class="">
		<Newslettersignup />
	</div>
    <hr class="!border-t-2" />
    <h3 class="p-4 ">Coming soon: </h3>
	<ul class="list pl-4 text-xl ">
		<li class="p-2">
			<span><svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor"><path d="M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h7.5M16 2v4M8 2v4m-5 4h18"></path><path d="M18 21a3 3 0 1 0 0-6a3 3 0 0 0 0 6v0Zm4 1l-1.5-1.5"></path></g></svg></span>
			<span class="flex-auto">Permit availability and alerts</span>
		</li>
		<li class="p-2">
			<span><svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></g></svg></span>
			<span class="flex-auto">Custom dashboards built for your favorite places</span>
		</li>
		<li class="p-2">
			<span><svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></span>
			<span class="flex-auto">Ad-free community forum: connect with real humans in the river & boating communities!</span>
		</li>
	</ul>
    <hr />
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-3/6 p-8">
		<h3 class="p-2">Click to view the TOP 10 most popular USA rivers!</h3>
		<a href="/rivers/popular" class="btn variant-filled-tertiary text-xl" data-sveltekit-preload-data="hover">Popular Rivers</a>
	</div>
	</div>
</div>

<style>
	.logobackground {
  position: relative;
}

.logobackground::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('WaveLogo.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  opacity: 0.05;
  z-index: -2;
}

.textbackground {
  position: relative;
}

.textbackground::before {
	content: "";
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #B3BCC4;
	opacity: 0.25;
	z-index: -1;
}
</style>