<script lang="ts">
	import Multipleflowcard from '$lib/components/multipleflowcard.svelte';
	
    import type { PageData } from './$types';
    
    export let data: PageData;
    
    const chartdata = data.chartdata;

</script>

<div class="pr-6 pl-6 pb-6 pt-2 items-center justify-center container flex">
    <h3>The TOP 10! Updated based on user favorites</h3>
</div>
<div class="w-full text-token grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
<Multipleflowcard {chartdata}/>
</div>