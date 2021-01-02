<script lang="ts">
  import EqualSpace from './EqualSpace.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  const handleClick = (dir: 'INC' | 'DEC') => {
    if (dir === 'INC') {
      dispatch('click', { val: value + 1 })
    }
    if (dir === 'DEC') {
      if (value === 1) return
      dispatch('click', { val: value - 1 })
    }
  }

  export let value: number
</script>

<style type="text/scss">
  // @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';
  .num {
    width: 1.5rem;
    display: inline-block;
    text-align: center;
  }
</style>

<div>
  <button on:click={() => handleClick('DEC')}>—</button>
  <div class="num">{value.toString().padStart(2, '0')}</div>
  <button on:click={() => handleClick('INC')}>＋</button>
</div>
