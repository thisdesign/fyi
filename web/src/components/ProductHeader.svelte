<script lang="ts">
  /**
   * Title and close bar
   */
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import type { El } from '../stores/data'

  export let node: El = null
  export let link: string | null = null

  import { cmsProduct } from '../stores/data'
  import { globalState } from '../stores/global'
  let name = $cmsProduct?.productPage?.series || 'Name'
  let seriesVariant = $cmsProduct?.productPage?.seriesVariant || null

  const dispatch = createEventDispatcher()

  const handleClick = () => {
    dispatch('close')
  }

  onMount(() => {
    $globalState.invertManager.registerNavItem(node)
  })

  onDestroy(() => {
    $globalState.invertManager.registerNavItem(node)
  })
</script>

<style type="text/scss">
  @import '../style/breakpoints.scss';
  @import '../style/vars.scss';

  .productHeader {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: $size-gutter;

    position: sticky;
    top: $size-gutter;

    button {
      display: block;
      margin: -0.75rem;
      padding: 0.75rem;
    }

    .nameWrap {
      display: flex;
    }

    .name {
      margin-left: 0.5rem;
    }

    @include media('>=sm') {
      width: 100%;
    }

    @include media('<sm') {
      color: white;
      z-index: 1;
    }
  }
</style>

<div class="productHeader" bind:this={node}>
  <div class="nameWrap">
    {#if link}
      <a href={link}><button on:click={handleClick}>&times;</button></a>
    {:else}<button on:click={handleClick}>&times;</button>{/if}

    <span class="name">{name}</span>
  </div>
  <span>{seriesVariant}</span>
</div>
