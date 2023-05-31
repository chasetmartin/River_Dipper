<script lang="ts">
	import Singleflowcard from '$lib/components/singleflowcard.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;

    $: chartdata = data.indStream.timeSeries;

</script>

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