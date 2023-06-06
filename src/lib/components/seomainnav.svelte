<script lang="ts">
    export let title: any;  // page title
    export let description: any;  // page description
    export let keywords: any;  // page keywords
    export let type: any;  // page type

    import { page } from "$app/stores";

    $: url = $page.url.href;

</script>

<svelte:head>
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
        "url": "${url}",
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                "@type": "ListItem",
                "position": 1,
                "name": "River Dipper",
                "item": "https://river.dipper.pro"
                },
                {
                "@type": "ListItem",
                "position": 2,
                "name": "${title}",
                "item": "${url}"
                }
                ]
            }
        }
        </script>`}

</svelte:head>