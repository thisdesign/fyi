<script lang="ts">
  import { buildImage } from '../lib/ResponsiveImage'
  import Error from '../routes/_error.svelte'
  import type { InspirationSchema } from '../types'
  import App from './App.svelte'
  import BlockContent from './BlockContent.svelte'
  import PlayButton from './PlayButton.svelte'
  import Video from './Video.svelte'

  export let data: InspirationSchema
  let { image, title, href, text, category, video } = data
  let categorySlug = category?.slug?.current || ''
  let categoryTitle = category?.title || null

  let img = { ...buildImage(image, { sizes: { xxs: '100vh', sm: '70vw' } }) }
</script>

<div>
  <article>
    <div class="contentWrap">
      {#if video}
        <Video src={video} poster={img.src} />
      {:else}
        <img {...img} alt={title} />
      {/if}
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
    }
  }

  .contentWrap {
    margin-bottom: $spacer-3;
  }
</style>
