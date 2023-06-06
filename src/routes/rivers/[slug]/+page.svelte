<script lang="ts">
	import { onDestroy } from 'svelte';
    import type { PageData } from './$types';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { goto } from '$app/navigation';
	import Seostategauges from '$lib/components/seostategauges.svelte';

    
    export let data: PageData;
    
    $: searchSites = data.stateStreams.timeSeries;

    $: searchStore = createSearchStore(searchSites);

    $: unsubscribe = searchStore.subscribe((model) => searchHandler(model));
        
    onDestroy(() => {
        unsubscribe();
    });

</script>

    <Seostategauges
    title="{data.stateTitle} River Gauges" 
    description="Flows and forecasts for rivers in {data.stateTitle}." 
    keywords="river, flow, guage, {data.stateTitle}, CFS, cubic feet per second, discharge, graph, hydrograph real-time, whitewater, kayaking, rafting, canoeing, paddleboarding, sup, paddle, water, recreation, outdoors, adventure, data, beta" 
    type="WebPage" 
    />

    <div class="w-full text-token grid grid-cols-1 md:grid-cols-2">
        <h1 class="p-2 items-center justify-center flex">{data.stateTitle}</h1>
        <label class="label items-center justify-center flex p-8">
            <input class="input" type="search" placeholder="Search..." bind:value={$searchStore.search} />
        </label>
    </div>
    <hr class="!border-t-4" />
    <div class="w-full items-center justify-center flex p-2">
        <h4 class="p-2">Click a river card to view more details! Search using the reactive search bar above </h4>
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M12 19V5m-7 7l7-7l7 7"></path></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21l-4.35-4.35"></path></g></svg>
    </div>
    <hr class="!border-t-3 p-4" />

    <div class="w-full text-token grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each $searchStore.filtered as site }
            <button on:click={() => goto(`/rivers/${data.stateCode}/${site.sourceInfo.siteCode[0].value}`)}>
            <div class="card variant-ghost p-4">
                <div class="p-2  rounded-md flex variant-filled-primary">
                <h3 class="p-2 rounded-md flex-wrap no-underline">{site.sourceInfo.siteName.slice(0, -4).toUpperCase()}</h3>
                </div>
                <div class="p-2">
                    <h4 class="badge bg-gradient-to-br variant-glass">Current Flow: </h4> 
                    <h4 class="badge variant-filled-warning">{site.values[0].value[0].value} CFS</h4>
                </div>
            </div>
        </button>
        {/each}
    </div>

    <style>
        .card {
            cursor: pointer;
        }
    </style>