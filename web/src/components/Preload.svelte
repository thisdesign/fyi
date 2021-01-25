<script lang="ts">
  import { SplitText } from 'gsap/SplitText'
  import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
  import gsap from 'gsap'
  import { onMount } from 'svelte'

  gsap.registerPlugin(ScrollToPlugin)
  gsap.registerPlugin(SplitText)

  export let heading: string | null
  export let body: string | null

  //nodes
  let splitText: HTMLElement
  let node: HTMLElement

  onMount(() => {
    const tl = gsap.timeline()
    let split = new SplitText(splitText, { type: 'words' })

    tl.to('.scroll', { duration: 0, scrollTo: 0 })

    tl.from(split.words, {
      delay: 0.2,
      duration: 0.5,
      y: 15,
      opacity: 0,
      stagger: 0.02,
      ease: 'Power4.out',
      onComplete: () => split.revert(),
    })

    tl.from(
      '.paragraph',
      {
        opacity: 0,
        y: 32,
      },
      '=-0.5'
    )

    tl.to('.scroll', {
      duration: 1,
      scrollTo: window.innerHeight * 0.1,
      // delay: 1,
      ease: 'Power4.easeOut',
    })
  })
</script>

<div class="preload" bind:this={node}>
  <div class="container">
    <h2 class="h1" bind:this={splitText}>
      {heading}
    </h2>
    <p class="p paragraph">
      {body}
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
