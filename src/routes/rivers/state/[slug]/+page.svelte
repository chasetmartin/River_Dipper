<script lang="ts">
	import { onDestroy } from 'svelte';
    import type { PageData } from './$types';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { goto } from '$app/navigation';

    
    export let data: PageData;
    
    $: searchSites = data.stateStreams.timeSeries;

    $: searchStore = createSearchStore(searchSites);

    $: unsubscribe = searchStore.subscribe((model) => searchHandler(model));
        
    onDestroy(() => {
        unsubscribe();
    });

</script>

    <div class="w-full text-token grid grid-cols-1 md:grid-cols-2">
        <h1 class="p-8 items-center justify-center flex">{data.stateTitle}</h1>
        <label class="label items-center justify-center flex p-8">
            <input class="input" type="search" placeholder="Search..." bind:value={$searchStore.search} />
        </label>
    </div>
    <hr class="!border-t-4 p-4" />

    <div class="w-full text-token grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each $searchStore.filtered as site }
            <button on:click={() => goto(`/rivers/state/${data.stateCode}/${site.sourceInfo.siteCode[0].value}`)}>
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