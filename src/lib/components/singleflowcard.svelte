<script lang="ts">


// export let streamflow: any;
// console.log(streamflow);

	import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
	import Singlesitebarline from "./singlesitebarline.svelte";

  export let chartdata: any;
// console.log(chartdata[0].values[0].value);
// const lastIndex = chartdata.values[0].value.length - 1;
// console.log(lastIndex);

const formatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 0
})

</script>

    {#each chartdata as stream}
    {#if stream.values[0].value.length > 1}
    <div class="card p-4">
      <div class="p-4">
        <h3 class="p-4 rounded-md flex variant-filled-primary">{stream.sourceInfo.siteName}</h3>
      </div>
        <!-- <div class="p-2">
            <h4 class="badge bg-gradient-to-br variant-glass pl-4">Current Flow: </h4> 
            <h3 class="badge variant-filled-warning">{formatter.format(stream.values[0].value.slice(-1)[0].value)} CFS</h3>
            <h4 class="badge variant-soft">{stream.variable.variableDescription}</h4>
            <h4 class="badge variant-soft">{stream.values[0].value.slice(-1)[0].dateTime}</h4>
        </div> -->
        <div class="">
        <Accordion>
          <AccordionItem open>
            <svelte:fragment slot="lead"><svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 22 22"><g fill="none" stroke="currentColor"><path d="M3 3v18h18"></path><path d="m19 9l-5 5l-4-4l-3 3"></path></g></svg></svelte:fragment>
            <svelte:fragment slot="summary">Flow Chart</svelte:fragment>
            <svelte:fragment slot="content">
              
                <Singlesitebarline {stream} />
            
            </svelte:fragment>
          </AccordionItem>
          <AccordionItem>
            <svelte:fragment slot="lead"><svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M3 3v18h18m-3-4V9m-5 8V5M8 17v-3"></path></svg></svelte:fragment>
            <svelte:fragment slot="summary">Flow Forecast</svelte:fragment>
            <svelte:fragment slot="content">Coming Soon!</svelte:fragment>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
    {/if}
    {/each}
    
