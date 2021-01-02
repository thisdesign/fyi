<script lang="ts">
  /**
   * Product page "info" section
   */
  import BlockContent from '@movingbrands/svelte-portable-text'
  import { cmsProduct, productDomStore } from '../stores/data'
  import ScentNotes from './ScentNotes.svelte'

  let notes = $cmsProduct?.productPage?.notes
  const content = $cmsProduct?.productPage?.description
  export const customSerializers = {}
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  @import '../style/breakpoints.scss';

  .productInfo {
    display: grid;
    grid-gap: $size-gutter;
    margin-bottom: calc(#{$size-medium} - #{$size-gutter});

    @include media('>=sm') {
      grid-template-columns: repeat(2, 1fr);
      align-items: flex-start;
    }
  }
</style>

<div class="productInfo" bind:this={$productDomStore.info}>
  <div>
    <BlockContent blocks={content} />
  </div>

  {#if notes}
    <ScentNotes {notes} />
  {/if}
</div>
