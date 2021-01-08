<script lang="ts">
  import gsap from 'gsap'
  import { onMount } from 'svelte'

  import { globalState } from '../stores/globalState'
  import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'

  import type { InspirationSchema } from '../types'
  import InspirationCard from './InspirationCard.svelte'
  export let items: InspirationSchema[]

  let wrapper: HTMLElement
  let windowHeight = 0

  const setWindowHeight = () => (windowHeight = window.innerHeight)

  onMount(() => {
    setWindowHeight()
  })

  $: isOpen = $globalState.isInspirationActive

  const setActive = (cond: boolean) =>
    globalState.update((prev) => ({ ...prev, isInspirationActive: cond }))

  $: {
    if (typeof window !== 'undefined') {
      gsap.to(wrapper, {
        y: isOpen ? '0' : windowHeight - 64,
        scale: isOpen ? 1 : 0.9,
        duration: 1,
        delay: 0.2,
        ease: 'Power3.easeInOut',
        borderRadius: isOpen ? 0 : 32,
      })
    }
  }

  $: {
    if (isOpen) {
      disableBodyScroll(wrapper)
    } else {
      clearAllBodyScrollLocks()
    }
  }
</script>

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
    border-radius: $spacer-3;
    height: 100vh;
    overflow-y: scroll;
    transform: translateY(100vh);
    z-index: 100;
    box-shadow: 0 0 64px rgba(0, 0, 0, 0.16);
  }

  .title {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 300ms opacity ease;

    &.hidden {
      opacity: 0;
    }
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

<svelte:window on:resize={setWindowHeight} />

<div class="wrapper" bind:this={wrapper}>
  <div class="title" class:hidden={isOpen} on:click={() => setActive(true)}>
    View Inspiration
  </div>
  {#each items as item, i}
    <div class="grid">
      <div class={`row layout-${i % 4}`}>
        <InspirationCard data={item} />
      </div>
    </div>
  {/each}
</div>
