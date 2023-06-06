<script lang="ts">
    export let title: any;  // page title
    export let description: any;  // page description
    export let keywords: any;  // page keywords
    export let type: any;  // page type
    export let canonical: any;  // page canonical

    import { page } from "$app/stores";

    $: url = $page.url.href;

</script>

<svelte:head>
    {#if canonical}
        <link rel="canonical" href={canonical}>
    {/if}
    <title>{title}</title>
	<meta property="og:title" content={title} />
    <meta name="twitter:title" content={title} />

    <meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta name="twitter:description" content={description} />

    <meta name="keywords" content={keywords} />

    {@html `<script type="application/ld+json">
        {
        "@context": "https://schema.org",
        "@type": "${type}",
        "name": "${title}",
        "description": "${description}",
        "url": "${url}"
        }
        </script>`}

</svelte:head>