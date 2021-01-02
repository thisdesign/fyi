<script lang="ts">
  import type { SanityBlockContent } from '../types'
  import BlockContent from '@movingbrands/svelte-portable-text'

  export let intro: SanityBlockContent | null
  export let body: SanityBlockContent | null
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';

  .home {
    background: white;
    padding: $size-margin;
  }

  .h1 {
    margin-bottom: $size-margin;
  }

  .paragraph {
    column-count: 2;
    max-width: 5f0em;
  }
</style>

<div class="home">
  <h2 class="h1">
    <BlockContent blocks={intro} />
  </h2>
  <div class="paragraph">
    <BlockContent blocks={body} />
  </div>
</div>
