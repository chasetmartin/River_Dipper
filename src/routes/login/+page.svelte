<script lang="ts">
	import Newslettersignup from "$lib/components/Newslettersignup.svelte";
	import Seomainnav from "$lib/components/seomainnav.svelte";
    import { fade } from 'svelte/transition';

  
</script>

<Seomainnav 
title="Login" 
description="Your account will give you access to the forum to connect with other river lovers." 
keywords="river, flow, guage, whitewater, kayaking, rafting, canoeing, paddleboarding, sup, paddle, water, recreation, outdoors, adventure, community, forum, questions, reviews, answers, beta, account, login"
type="WebPage" 
/>
<div in:fade={{duration:600}} class="container">
    <h1 class="p-8">Login</h1>
    <hr class="!border-t-4" />
    <h2 class="p-4">This functionality is coming soon!</h2>
    <hr class="!border-t-2" />
    <h3 class="p-4">Your account will give you access to the forum to connect with other river lovers.</h3>
    <hr class="!border-t-2" />
    <h3 class="p-4">In the meantime sign up for our newsletter for alerts about new and exciting features, like user authentication!</h3>
        <Newslettersignup />
    <hr class="!border-t-2" />
    <h4 class="p-4">We respect your privacy. We do not sell your data, and we only collect what's necessary to make sure you're a real human and to improve your user experience.</h4>
    <hr />
</div>