<script lang="ts">
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import BlockContent from '@movingbrands/svelte-portable-text'

  import type { SanityBlockContent, SanityImage } from '../types'

  import { onMount } from 'svelte'
  import Video from './Video.svelte'
  import { buildImage } from '../lib/ResponsiveImage'

  gsap.registerPlugin(ScrollTrigger)

  export let intro: SanityBlockContent | null
  export let body: SanityBlockContent | null
  export let videoUrl: string | null
  export let placeholderImg: SanityImage | null
  export let isTwoCol: boolean

  const img = placeholderImg ? buildImage(placeholderImg) : null
  const poster = img?.src || ''
</script>

<div id="home" />
<div class="home-outer">
  <div class="home">
    <div class="container">
      <h2 class="h1">
        <BlockContent blocks={intro} />
      </h2>
      <div class="paragraph" class:cols={isTwoCol}>
        <BlockContent blocks={body} />
      </div>
      {#if videoUrl}<Video src={videoUrl} {poster} />
      {:else}
        <img {...img} alt="FYi" />
      {/if}
    </div>
  </div>
</div>

<style type="text/scss">
  @import '../style/vars.scss';
  @import '../style/breakpoints.scss';

  .home {
    background: white;
    padding: $size-margin-lg $size-margin $size-margin;
    transform-origin: top;
    border-radius: $size-corner-radius $size-corner-radius 0 0;

    :global(p) {
      margin-bottom: 1rem;
    }

    :global(video) {
      width: 100%;
      border-radius: $size-corner-radius;
    }
  }

  .h1 {
    margin-bottom: $size-margin;
  }

  img {
    border-radius: $size-corner-radius;
    overflow: hidden;
    width: 100%;
  }

  .paragraph {
    max-width: 30em;

    &.cols {
      @include media('>=sm') {
        column-count: 2;
        max-width: 50em;
      }
    }

    margin-bottom: $size-margin;
  }

  .inspoTrigger {
    display: block;
  }

  #home {
    position: relative;
    top: -120px;
  }
</style>
