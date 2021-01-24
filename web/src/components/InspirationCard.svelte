<script lang="ts">
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  import { onMount } from 'svelte'

  import { buildImage } from '../lib/ResponsiveImage'
  import type { InspirationSchema } from '../types'
  import BlockContent from './BlockContent.svelte'
  import Video from './Video.svelte'

  export let data: InspirationSchema

  let { image, title, href, text, category, video } = data
  let categorySlug = category?.slug?.current || ''
  let categoryTitle = category?.title || null

  let img = { ...buildImage(image, { sizes: { xxs: '100vh', sm: '70vw' } }) }

  gsap.registerPlugin(ScrollTrigger)

  let parallaxItem: HTMLElement

  onMount(() => {
    gsap.to(parallaxItem, {
      y: '+=50',
      scrollTrigger: {
        trigger: parallaxItem,
        markers: true,
        start: 'top center',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
</script>

<div class="inspoWrap">
  <article>
    <div class="contentWrap">
      <div
        bind:this={parallaxItem}
        style="transform: scale(1.3) translateY(-25px);"
      >
        {#if video}
          <Video src={video} poster={img.src} />
        {:else}
          <img {...img} alt={title} />
        {/if}
      </div>
    </div>
    <div class="titleArea">
      <h3>
        {title}
      </h3>

      <div class="data">
        {#if categoryTitle && categorySlug}
          <a href={`/inspiration/${categorySlug}`}>{categoryTitle}</a>
        {/if}

        {#if categoryTitle && categorySlug && href}
          <span>•</span>
        {/if}

        {#if href}
          <a {href} rel="noopener noreferrer" target="_blank">Link ↗</a>
        {/if}
      </div>
    </div>

    <div class="p">
      <BlockContent blocks={text || null} />
    </div>
  </article>
</div>

<style type="text/scss">
  @import '../style/vars.scss';
  @import '../style/breakpoints.scss';

  .p {
    opacity: 0.5;
  }

  article {
    .titleArea {
      @include media('>=sm') {
        display: flex;
        justify-content: space-between;
      }

      margin-bottom: $spacer-1;

      h3 {
        display: flex;
      }

      a {
        opacity: 0.5;
        display: inline-block;
      }
    }

    img {
      display: block;
      width: 100%;
      margin-bottom: $spacer-3;
    }
  }

  .data {
    display: flex;

    span {
      padding: 0 8px;
      opacity: 0.5;
    }
  }

  .contentWrap {
    border-radius: $size-corner-radius;
    margin-bottom: $spacer-3;
    overflow: hidden;
  }
</style>
