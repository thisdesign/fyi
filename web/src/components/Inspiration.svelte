<script lang="ts">
  import gsap from 'gsap'
  import { onMount } from 'svelte'

  import { globalState, setInspirationActive } from '../stores/globalState'
  import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'

  import type { InspirationSchema } from '../types'
  import InspirationCard from './InspirationCard.svelte'

  export let items: InspirationSchema[]
  export let standAlone: boolean = false
  export let forceOpen: boolean = false

  let wrapper: HTMLElement
  let windowHeight = 0
  $: isOpen = forceOpen || $globalState.isInspirationActive

  onMount(() => {
    setWindowHeight()
  })

  /**
   * Fns
   */
  const setWindowHeight = () => (windowHeight = window.innerHeight)

  // gets Y val for inspo card
  $: getInspoY = () => {
    if (isOpen) return 0
    return $globalState.isInspirationPeeking ? windowHeight - 64 : windowHeight
  }

  /**
   * Animation
   */
  $: {
    if (typeof window !== 'undefined' && !standAlone) {
      gsap.to(wrapper, {
        y: getInspoY(),
        scale: isOpen ? 1 : 0.9,
        duration: 0.8,
        delay: 0.2,
        ease: 'Power3.easeInOut',
        borderRadius: isOpen ? 0 : '2vw',
      })
    }
  }

  /**
   * Body scroll
   */

  $: {
    if (isOpen) {
      disableBodyScroll(wrapper)
    } else {
      clearAllBodyScrollLocks()
    }
  }
</script>

<svelte:window on:resize={setWindowHeight} />

<div class="wrapper" bind:this={wrapper} class:standAlone>
  <div
    class="nudge"
    class:hidden={isOpen}
    on:click={() => setInspirationActive(true)}
  >View Inspiration</div>
  <div class="title" class:hidden={!isOpen}>
    <button on:click={() => setInspirationActive(false)}>&times</button>
    Inspiration
  </div>
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
    padding: $size-margin-lg $size-margin;
    background: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    transform-origin: top;
    height: 100vh;
    overflow-y: scroll;
    box-shadow: 0 0 64px rgba(0, 0, 0, 0.16);

    &:not(.standAlone) {
      z-index: 10;
      transform: translateY(100vh);
    }
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

    button {
      margin-right: $spacer-1;
    }
  }

  .nudge {
    cursor: pointer;

    width: 100%;
    height: 75px;

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
