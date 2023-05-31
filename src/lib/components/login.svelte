<script lang="ts">
    import { drawerStore } from "@skeletonlabs/skeleton";

    function drawerClose(): void {
        drawerStore.close();
    }
</script>
<div class="p-4">
    
    <a href="/login" class="btn variant-filled-tertiary" on:click={drawerClose}>Login</a>
</div>

<style>
  
</style>