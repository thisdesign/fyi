<script lang="ts">
  import { buildImage } from '../lib/ResponsiveImage'
  import type { InspirationSchema } from '../types'
  import BlockContent from './BlockContent.svelte'
  import VimeoPlayer from './VimeoPlayer.svelte'

  export let data: InspirationSchema
  let { image, title, href, text, category, vimeoUrl } = data
  let categorySlug = category?.slug?.current || ''
  let categoryTitle = category?.title || null

  console.log(vimeoUrl)

  let isPlaying = false
</script>

<div>
  <article>
    <div class="contentWrap" on:click={() => (isPlaying = true)}>
      {#if vimeoUrl}
        <VimeoPlayer url={vimeoUrl} {isPlaying} />
      {/if}
      <img
        {...buildImage(image, { sizes: { xxs: '100vh', sm: '70vw' } })}
        alt={title}
        class:visible={!isPlaying}
      />
    </div>
    <div class="titleArea">
      <h3>
        {title}
        {#if categoryTitle && categorySlug}
          <a href={`/inspiration/${categorySlug}`}>: {categoryTitle}</a>
        {/if}
      </h3>

      {#if href}
        <a {href} rel="noopener noreferrer" target="_blank">Link ↗</a>
      {/if}
    </div>

    <div class="p">
      <BlockContent blocks={text || null} />
    </div>
  </article>
</div>

<style type="text/scss">
  @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';

  .p {
    opacity: 0.5;
  }

  article {
    .titleArea {
      display: flex;
      justify-content: space-between;
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
      display: none;
      width: 100%;

      filter: brightness(0.96);

      &.visible {
        display: block;
      }
    }
  }

  .contentWrap {
    position: relative;
    border-radius: $spacer-3;
    margin-bottom: $spacer-3;
    overflow: hidden;

    :global(svg) {
      height: $spacer-3;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 10;
      transform: translate3d(-50%, -50%, 0);
    }
  }
</style>
