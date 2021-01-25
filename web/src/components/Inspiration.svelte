<script lang="ts">
  import gsap from 'gsap'

  import { onMount } from 'svelte'

  import type { InspirationSchema } from '../types'
  import InspirationCard from './InspirationCard.svelte'

  export let items: InspirationSchema[]
  export let category: string | null = null

  onMount(() => {
    gsap.to('.grid', {
      ease: 'power3.in',
      opacity: 1,
      delay: 0.5,
      stagger: 0.1,
    })
  })
</script>

<div class="wrapper">
  {#if category}
    <h1 class="h1">
      {category} <a href="/inspiration">&times;</a>
    </h1>
  {/if}
  {#each items as item, i}
    <div class="grid">
      <div class={`row layout-${i % 4}`}>
        <InspirationCard data={item} />
      </div>
    </div>
  {/each}
</div>

<style type="text/scss">
  @import '../style/vars.scss';
  @import '../style/breakpoints.scss';

  h1 {
    margin-bottom: $size-margin;
    a {
      opacity: 0.25;
    }
  }

  .wrapper {
    padding: $size-margin;
    background: white;
    margin-top: 80px;
  }

  .nudge,
  .title {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    transition: 1200ms opacity ease;

    &.hidden {
      opacity: 0;
    }
  }

  .nudge {
    cursor: pointer;

    width: 100%;
    height: 64px;

    justify-content: center;
    align-items: center;
  }

  .grid {
    opacity: 0;

    @include media('>=sm') {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
    }
    margin-bottom: $size-margin-lg;
  }

  .row {
    &.layout-0 {
      grid-column: 1 / span 3;
    }
    &.layout-1 {
      grid-column: 3 / span 4;
    }
    &.layout-2 {
      grid-column: 2 / span 3;
    }
    &.layout-3 {
      grid-column: 1 / span 5;
    }
  }
</style>
