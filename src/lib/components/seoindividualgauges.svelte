<script lang="ts">
    export let title: any;  // page title
    export let description: any;  // page description
    export let keywords: any;  // page keywords
    export let type: any;  // page type
    export let statecode: any;  // page state

    import { page } from "$app/stores";
    import { states } from "$lib/helpers/states";   

    $: url = $page.url.href;

    const stateabr = states.filter((state) => state.id === statecode)[0].code;
    const state = states.filter((state) => state.id === statecode)[0].name;

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
                "name": "Rivers",
                "item": "https://river.dipper.pro/rivers"
                },
                {
                "@type": "ListItem",
                "position": 3,
                "name": "${state} River Gauges",
                "item": "https://river.dipper.pro/rivers/${stateabr}"
                },
                {
                "@type": "ListItem",
                "position": 4,
                "name": "${title}",
                "item": "${url}"
                }
                ]
            }
        }
        </script>`}

</svelte:head>