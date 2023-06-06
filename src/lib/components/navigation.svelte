<script lang="ts">
	import { Accordion, AccordionItem, drawerStore } from "@skeletonlabs/skeleton";
    import { states } from "$lib/helpers/states";

    function drawerClose(): void {
        drawerStore.close();
    }

</script>

<nav class="list-nav p-4">
    <ul>
        <li><a href="/" on:click={drawerClose}>Home</a></li>
        <li><a href="/forum" on:click={drawerClose}>Forum</a></li>
        <li><a href="/about" on:click={drawerClose}>About</a></li>
        <hr>
        <li>
            <Accordion>
                <AccordionItem open>
                    <svelte:fragment slot="lead"></svelte:fragment>
                    <svelte:fragment slot="summary">Rivers</svelte:fragment>
                    <svelte:fragment slot="content">
                        <a href="/rivers/popular" data-sveltekit-preload-data on:click={drawerClose}>Popular Flows</a>
                        <Accordion>
                            <hr>
                            <AccordionItem>
                            <svelte:fragment slot="lead"></svelte:fragment>
                            <svelte:fragment slot="summary">By State:</svelte:fragment>
                            <svelte:fragment slot="content">
                                <ul>
                                    {#each states as state }
                                        <li><a href="/rivers/{state.code}" data-sveltekit-preload-data='off' on:click={drawerClose}>{state.name}</a></li>
                                    {/each}
                                </ul>
                            </svelte:fragment>
                          </AccordionItem>
                        </Accordion> 
                    </svelte:fragment>
                </AccordionItem>
            </Accordion>
        </li>
    </ul>
</nav>