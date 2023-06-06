<script lang="ts">
	import Seoindividualgauges from '$lib/components/seoindividualgauges.svelte';
    import Singleflowcard from '$lib/components/singleflowcard.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;

    $: chartdata = data.indStream.timeSeries;
</script>

<Seoindividualgauges 
    title="{data.indStream.timeSeries[0].sourceInfo.siteName} Flow Gauge" 
    description="Flows and forecasts for {data.indStream.timeSeries[0].sourceInfo.siteName}." 
    keywords="river, flow, guage, {data.indStream.timeSeries[0].sourceInfo.siteName}, CFS, cubic feet per second, discharge, graph, hydrograph real-time, whitewater, kayaking, rafting, canoeing, paddleboarding, sup, paddle, water, recreation, outdoors, adventure, data, beta" 
    type="WebPage"
    statecode="{data.indStream.timeSeries[0].sourceInfo.siteProperty[2].value}"
/>

<div class="w-full text-token grid grid-cols-1 gap-8">
    <Singleflowcard {chartdata} />
</div>

<!-- <div class="w-full text-token grid grid-cols-1 gap-8">
    {#each data.indStream.timeSeries as site }
        <div class="card variant-ghost p-4">
            <h3 class="text-xl">{site.sourceInfo.siteName.slice(0, -4).toUpperCase()}</h3>
            <div class="p-2">
                <h4 class="badge bg-gradient-to-br variant-gradient-primary-tertiary">Current Flow: </h4> 
                <h4 class="badge variant-filled-warning">{site.values[0].value.slice(-1)[0].value} CFS</h4>
            </div>
        </div>
    {/each}
</div> -->