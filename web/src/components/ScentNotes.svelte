<script lang="ts">
  /**
   * Scent notes
   */
  import type { ProductNotes } from '../types'

  export let notes: ProductNotes

  const noteArr = [
    ['Base', notes.base],
    ['Mid', notes.middle],
    ['Top', notes.top],
  ]
</script>

<style type="text/scss">
  // @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';

  .noteRow {
    display: grid;
    grid-template-columns: 3rem auto;
    align-items: baseline;

    :not(:last-child) {
      margin-bottom: 0.25rem;
    }
  }
</style>

<div class="noteRow">
  {#each noteArr as [name, notes]}
    <h3 class="mono">({name})</h3>
    <h4>{notes}</h4>
  {/each}
</div>
