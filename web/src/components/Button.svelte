<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let size: 'md' | 'sm' | 'none' = 'none'

  const dispatch = createEventDispatcher()
  const handleClick = () => dispatch('click')
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';

  button {
    border: 1px solid black;
    display: block;
    width: 100%;
    border-radius: 9999px;
    padding: 0.37rem ms(4) 0.2rem;

    &.sm {
      max-width: 10rem;
    }

    &.md {
      max-width: 17rem;
    }
  }
</style>

<button class={size} on:click={handleClick}><slot /></button>
