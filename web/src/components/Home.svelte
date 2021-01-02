<script lang="ts">
  import type { SanityBlockContent } from '../types'
  import BlockContent from '@movingbrands/svelte-portable-text'

  export let intro: SanityBlockContent | null
  export let body: SanityBlockContent | null
  export let videoUrl: string | null
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';

  .home {
    background: white;
    padding: $size-margin-lg $size-margin;
    transform: scale(0.9);
    transform-origin: bottom;
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
</style>

<div class="home">
  <h2 class="h1">
    <BlockContent blocks={intro} />
  </h2>
  <div class="paragraph">
    <BlockContent blocks={body} />
  </div>
  {#if videoUrl}<video src={videoUrl} muted controls />{/if}
</div>
