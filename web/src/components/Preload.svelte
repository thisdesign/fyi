<script lang="ts">
  import Type from './Type.svelte'
  import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
  import gsap from 'gsap'

  gsap.registerPlugin(ScrollToPlugin)

  export let heading: string | null
  export let body: string | null
  let node: HTMLElement

  function clearIntro() {
    const tl = gsap.timeline()

    tl.to(node, {
      duration: 0.8,
      ease: 'Power3.easeIn',
      y: '-100%',
    })

    tl.to(window, {
      duration: 0.7,
      scrollTo: 170,
      ease: 'Power3.easeInOut',
      delay: 0.4,
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
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h2 {
    margin-bottom: $size-margin;
  }
</style>

<div class="preload" bind:this={node} on:click={clearIntro}>
  <div class="container">
    <h2 class="h1">
      <Type text={heading || ''} />
    </h2>
    <p class="p">
      <Type text={body || ''} />
    </p>
  </div>
</div>
