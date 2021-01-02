<script lang="ts">
  import { onMount } from 'svelte'
  import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'

  import Logo from './Logo.svelte'
  import Type from './Type.svelte'
  import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
  import gsap from 'gsap'

  gsap.registerPlugin(ScrollToPlugin)

  export let heading: string | null
  export let body: string | null
  let node: HTMLElement

  onMount(() => {
    disableBodyScroll(node)
  })

  function clearIntro() {
    const tl = gsap.timeline()

    tl.to(node, {
      duration: 0.8,
      ease: 'Power3.easeIn',
      y: '-100%',
    })

    tl.to(window, { duration: 0.5, scrollTo: 170, delay: 0.4 }).then(() => {
      clearAllBodyScrollLocks()
    })
  }
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';

  .preload {
    padding: $size-margin;
    padding-top: $size-nav;
    background: white;
    // border-radius: 0 0 $size-corner-radius $size-corner-radius;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    position: fixed;
    top: 0;
  }

  h2 {
    margin-bottom: $size-margin;
  }
</style>

<div class="preload" bind:this={node} on:click={clearIntro}>
  <h2 class="h1">
    <Type text={heading || ''} />
  </h2>
  <p class="p">
    <Type text={body || ''} />
  </p>
</div>
