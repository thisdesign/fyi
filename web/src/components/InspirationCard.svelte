<script lang="ts">
  import { buildImage } from '../lib/ResponsiveImage'
  import type { InspirationSchema } from '../types'
  import BlockContent from './BlockContent.svelte'

  export let data: InspirationSchema
  let { image, title, href, text, category } = data
  let categorySlug = category?.slug?.current || ''
  let categoryTitle = category?.title || null
</script>

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
      border-radius: $spacer-3;
      display: block;
      width: 100%;
      margin-bottom: $spacer-3;
      filter: brightness(0.96);
    }
  }
</style>

<div>
  <article>
    <img
      {...buildImage(image, { sizes: { xxs: '100vh', sm: '70vw' } })}
      alt={title} />
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
