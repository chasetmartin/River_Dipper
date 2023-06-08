<script lang="ts">
    import { page } from '$app/stores';
</script>

<div class="container">
    {#if $page.status === 404}
    <h1 class="p-8">You must be lost.</h1>
    <hr class="!border-t-4" />
    <div class="w-full items-center justify-center flex p-2">
    <button class="btn variant-filled-tertiary p-8"><a data-sveltekit-preload-data='off' href="/">Go Home</a></button>
    </div>
    <hr />
    {:else if $page.status === 500}
    <h1 class="p-8">Whoops we weren't expecting that.</h1>
    <hr class="!border-t-4" />
    <h2 class="p-8">Try refreshing the page:</h2>
    <hr class="!border-t-2" />
    <div class="w-full items-center justify-center flex p-2">
    <button class="btn variant-filled-tertiary p-8"><a data-sveltekit-preload-data='off' href="{$page.url.href}"><svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></g></svg></a></button>
    </div>
    <hr />
    {/if}
</div>