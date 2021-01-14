<script lang="ts">
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import BlockContent from '@movingbrands/svelte-portable-text'

  import type { SanityBlockContent } from '../types'

  import { onMount } from 'svelte'
  import { globalState } from '../stores/globalState'

  gsap.registerPlugin(ScrollTrigger)

  export let intro: SanityBlockContent | null
  export let body: SanityBlockContent | null
  export let videoUrl: string | null

  const setCords = (cond: boolean) =>
    globalState.update((state) => ({ ...state, isNavCords: cond }))
  const setPeek = (cond: boolean) =>
    globalState.update((state) => ({ ...state, isInspirationPeeking: cond }))

  onMount(() => {
    gsap.to('.home', {
      scale: 1,
      scrollTrigger: {
        trigger: '.home-outer',
        toggleActions: 'play reverse play reverse',
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        onEnter: () => setCords(false),
        onLeaveBack: () => setCords(true),
      },
    })
  })

  onMount(() => {
    gsap.to('.inspoTrigger', {
      scrollTrigger: {
        trigger: '.inspoTrigger',
        toggleActions: 'play reverse play reverse',
        start: 'top bottom',
        onEnter: () => setPeek(true),
        onLeaveBack: () => setPeek(false),
      },
    })
  })
</script>

<div id="home" />
<div class="home-outer">
  <div class="home">
    <div class="container">
      <h2 class="h1">
        <BlockContent blocks={intro} />
      </h2>
      <div class="paragraph">
        <BlockContent blocks={body} />
      </div>
      {#if videoUrl}<video src={videoUrl} muted autoplay />{/if}
    </div>
    <span class="inspoTrigger" />
  </div>
</div>

<style type="text/scss">
  @import '../style/vars.scss';
  @import '../style/breakpoints.scss';

  .home {
    background: white;
    padding: $size-margin-lg $size-margin;
    transform: scale(0.9);
    transform-origin: top;
    border-radius: $size-corner-radius $size-corner-radius 0 0;

    :global(p) {
      margin-bottom: 1rem;
    }
  }

  .h1 {
    margin-bottom: $size-margin;
  }

  .paragraph {
    @include media('>=sm') {
      column-count: 2;
      max-width: 50em;
    }

    margin-bottom: $size-margin;
  }

  video {
    width: 100%;
    border-radius: $spacer-3;
  }

  .inspoTrigger {
    display: block;
  }

  #home {
    position: relative;
    top: -120px;
  }
</style>
