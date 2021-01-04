<script lang="ts">
  import type { InspirationSchema } from '../types'
  import InspirationCard from './InspirationCard.svelte'
  export let items: InspirationSchema[]
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';

  .wrapper {
    padding: $size-margin-lg $size-margin;
    background: white;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
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

<div class="wrapper">
  {#each items as item, i}
    <div class="grid">
      <div class={`row layout-${i % 4}`}>
        <InspirationCard data={item} />
      </div>
    </div>
  {/each}
</div>
