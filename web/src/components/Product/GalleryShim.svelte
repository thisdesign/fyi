<script lang="ts">
  import { pdpState, productDomStore } from '../../stores/data'
  import { handleGalleryClick } from './handleGalleryClick'

  let d = $productDomStore

  const handleShimClick = () => {
    if ($pdpState.isAnimating) return
    handleGalleryClick(d)
  }
</script>

<style type="text/scss">
  @import '../../style/vars.scss';
  @import '../../style/breakpoints.scss';

  .shim {
    position: relative;
    z-index: 2;
    height: $size-x-large;
    padding: $size-gutter;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }
</style>

<div class="shim" on:click={handleShimClick}>↓ See Gallery</div>
