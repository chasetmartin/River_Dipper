<!-- <script>
    import { onMount } from 'svelte';
  
    /**
	 * @type {string}
	 */
    let namelogosvgContent;
  
    onMount(async () => {
      const response = await fetch('NameLogoDarkSmall.svg');
      namelogosvgContent = await response.text();
    });
  </script>
  <div class="container">{@html namelogosvgContent}</div> -->

  <script>
    import { goto } from '$app/navigation';
  </script>

  <img on:click={() => goto(`/`)} on:keypress={() => goto(`/`)} src="NameLogoDarkSmall.svg" alt="RiverDipper" class="namelogo">

  <style>
    .namelogo {
      cursor: pointer;
    }
  </style>