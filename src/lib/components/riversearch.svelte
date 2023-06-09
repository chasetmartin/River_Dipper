<script lang="ts">
	import { onDestroy } from 'svelte';
	import { createSearchStore, searchHandler } from '$lib/stores/riversearch';
	import { goto } from '$app/navigation';
    import { allrivers } from '$lib/helpers/allrivers';

    
    $: searchSites = allrivers;

    $: searchStore = createSearchStore(searchSites);

    $: unsubscribe = searchStore.subscribe((model) => searchHandler(model));
        
    onDestroy(() => {
        unsubscribe();
    });

</script>
<div class="w-full p-4 justify-center items-center flex-auto">
    <label class="label">
        <input class="input" type="search" placeholder="Search All Rivers..." bind:value={$searchStore.search} />
    </label>
</div>
{#if $searchStore.filtered.length > 100}
<div></div>
{:else if $searchStore.filtered.length === 0}
<div class="w-full text-token card p=4 sapce-y-4">
    <p class="text-center p-2">No results found.</p>
</div>
{:else}
<div class="w-full text-token card p-4 space-y-4">
    <nav class="list-nav">
        <ul>
            {#each $searchStore.filtered as river}
                <li>
                    <a href="/rivers/{river.stateab}/{river.sitecode}">
                        <span class="badge p-2 variant-soft-primary rounded-xl"><svg xmlns="http://www.w3.org/2000/svg" width="1.4rem" height="1.4em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M5 12h14m-7-7l7 7l-7 7"></path></svg></span>
                        <p class="flex-auto whitespace-normal">
                            {river.site.toLowerCase().slice(0, -3)}
                            {river.stateab.toUpperCase()}
                        </p>
                        <span>⋮</span>
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</div>
{/if}


