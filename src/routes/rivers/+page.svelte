<script lang="ts">
    import Currentflowcard from '$lib/components/currentflowcard.svelte';
	
    import type { PageData } from './$types';
    
    export let data: PageData;
    
    const chartdata = data.chartdata;

</script>

<div class="p-6 items-center justify-center container flex">
    <h3>More rivers coming soon!</h3>
</div>
<div class="w-full text-token grid grid-cols-1 md:grid-cols-2 gap-8">
<Currentflowcard {chartdata}/>
</div>