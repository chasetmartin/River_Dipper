<script lang="ts">
	import Multipleflowcard from '$lib/components/multipleflowcard.svelte';
	import Seopopulargauges from '$lib/components/seopopulargauges.svelte';
	
    import type { PageData } from './$types';
    
    export let data: PageData;
    
    const chartdata = data.chartdata;

</script>

<Seopopulargauges 
    title="Popular Rivers" 
    description="Flows for the most popular rivers in the USA, as updated by users of River Dipper." 
    keywords="river, flow, guage, popular, CFS, cubic feet per second, discharge, graph, hydrograph real-time, whitewater, kayaking, rafting, canoeing, paddleboarding, sup, paddle, water, recreation, outdoors, adventure, data, beta" 
    type="WebPage"
/>

<div class="pr-6 pl-6 pb-6 pt-2 items-center justify-center container flex">
    <h3>The TOP 10! Updated based on user favorites</h3>
</div>
<div class="w-full text-token grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
<Multipleflowcard {chartdata}/>
</div>