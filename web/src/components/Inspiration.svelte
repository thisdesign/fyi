<script lang="ts">
  import { globalState } from '../stores/globalState'
  import type { InspirationSchema } from '../types'
  import InspirationCard from './InspirationCard.svelte'

  export let items: InspirationSchema[]
  export let standAlone: boolean = false
  export let forceOpen: boolean = false

  let wrapper: HTMLElement
  $: isOpen = forceOpen || $globalState.hash === 'inspiration'
</script>

<div class="wrapper" bind:this={wrapper} class:standAlone>
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

  .wrapper {
    padding: 0 $size-margin $size-margin-lg;
    background: white;
  }

  .nudge,
  .title {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    transition: 1200ms opacity ease;

    .standAlone & {
      display: none;
    }

    &.hidden {
      opacity: 0;
    }
  }

  .title {
    padding: $spacer-2 + $spacer-2;
  }

  .nudge {
    cursor: pointer;

    width: 100%;
    height: 64px;

    justify-content: center;
    align-items: center;
  }

  .grid {
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
