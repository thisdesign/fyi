<script lang="ts">
  import { onDestroy, onMount } from 'svelte'

  /**
   * Shows a 12-col grid overlay
   */
  let shown = false

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'g' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      shown = !shown
    }
  }

  onMount(() => {
    document.addEventListener('keydown', handleKey)
  })

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', handleKey)
    }
  })
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';

  .grid {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: $size-gutter;
    padding: 0 $size-gutter;
    pointer-events: none;

    &.shown {
      display: grid;
    }

    .col {
      border-left: 1px solid #ff00ff80;
      border-right: 1px solid #ff00ff80;
      height: 100vh;
      background: #ff00ff20;
    }
  }
</style>

<div class="grid" class:shown>
  {#each Array.from({ length: 12 }) as item, i}
    <div class="col" />
  {/each}
</div>
