<script lang="ts">
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  import type { SanityBlockContent } from '../types'
  import BlockContent from '@movingbrands/svelte-portable-text'
  import { onMount } from 'svelte'

  gsap.registerPlugin(ScrollTrigger)

  export let intro: SanityBlockContent | null
  export let body: SanityBlockContent | null
  export let videoUrl: string | null

  onMount(() => {
    gsap.to('.home', {
      scale: 1,
      scrollTrigger: {
        trigger: '.home-outer',
        toggleActions: 'play reverse play reverse',
        start: 'top center',
        end: '+=250',
        scrub: true,
      },
    })
  })
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';

  .home {
    background: white;
    padding: $size-margin-lg $size-margin;
    transform: scale(0.9);
    transform-origin: top;
    border-radius: $size-corner-radius $size-corner-radius 0 0;
  }

  .h1 {
    margin-bottom: $size-margin;
  }

  .paragraph {
    column-count: 2;
    max-width: 50em;
    margin-bottom: $size-margin;
  }

  video {
    width: 100%;
    border-radius: $size-corner-radius;
  }
  .space {
    height: 100vh;
  }
</style>

<div class="space" />
<div class="home-outer">
  <div class="home">
    <h2 class="h1">
      <BlockContent blocks={intro} />
    </h2>
    <div class="paragraph">
      <BlockContent blocks={body} />
    </div>
    {#if videoUrl}<video src={videoUrl} muted controls />{/if}
  </div>
</div>
