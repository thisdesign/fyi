<script lang="ts">
  import Type from './Type.svelte'
  import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
  import gsap from 'gsap'
  import { onMount } from 'svelte'

  gsap.registerPlugin(ScrollToPlugin)

  onMount(() => {
    const tl = gsap.timeline()
    tl.to(window, { duration: 0, scrollTo: 0 })
    tl.to(window, {
      duration: 1,
      scrollTo: window.innerHeight * 0.1,
      delay: 1.5,
      ease: 'Power3.easeInOut',
    })
  })

  export let heading: string | null
  export let body: string | null
  let node: HTMLElement
</script>

<div class="preload" bind:this={node}>
  <div class="container">
    <h2 class="h1">
      <Type text={heading || ''} />
    </h2>
    <p class="p">
      <Type text={body || ''} />
    </p>
  </div>
</div>
<div class="scrollIndicator">Scroll</div>

<style type="text/scss">
  @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';

  .scrollIndicator {
    color: white;
    text-align: center;
    height: 6vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .preload {
    padding: $size-margin;
    padding-top: $size-nav;
    background: white;
    // border-radius: 0 0 $size-corner-radius $size-corner-radius;
    height: calc(100vh + 2vw);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0 0 $size-corner-radius $size-corner-radius;
  }

  h2 {
    margin-bottom: $size-margin;
  }
</style>
