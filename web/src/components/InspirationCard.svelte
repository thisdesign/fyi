<script lang="ts">
  import { buildImage } from '../lib/ResponsiveImage'
  import type { InspirationSchema } from '../types'
  import BlockContent from './BlockContent.svelte'
  import PlayButton from './PlayButton.svelte'

  export let data: InspirationSchema
  let { image, title, href, text, category, vimeoUrl } = data
  let categorySlug = category?.slug?.current || ''
  let categoryTitle = category?.title || null
</script>

<div>
  <article>
    <div class="contentWrap">
      <PlayButton />
      <img
        {...buildImage(image, { sizes: { xxs: '100vh', sm: '70vw' } })}
        alt={title}
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
      border-radius: $size-corner-radius;
      display: block;
      width: 100%;
      margin-bottom: $spacer-3;
      filter: brightness(0.96);
    }
  }

  .contentWrap {
    position: relative;

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
