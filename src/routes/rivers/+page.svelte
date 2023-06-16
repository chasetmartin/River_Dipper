<script lang="ts">
	import Riversearch from "$lib/components/riversearch.svelte";
import Seomainnav from "$lib/components/seomainnav.svelte";
import { fade } from 'svelte/transition';

</script>
<Seomainnav 
title="Rivers" 
description="Flows and forecasts for rivers across the United States." 
keywords="river, flow, guage, CFS, cubic feet per second, graph, real-time, whitewater, kayaking, rafting, canoeing, paddleboarding, sup, paddle, water, recreation, outdoors, adventure, data, beta"
type="WebPage" 
/>

<div in:fade={{duration:600}} class="container">
    <h1 class="p-8">River Flows and Forecasts</h1>
    <hr class="!border-t-4" />
    <h2 class="p-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M19 12H5m7 7l-7-7l7-7"></path></svg>
        Please select popular flows, choose a specific state, or search!
        <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M12 5v14m7-7l-7 7l-7-7"></path></svg>
    </h2>
    <hr class="!border-t-2 pb-4" />

    <Riversearch />
</div>