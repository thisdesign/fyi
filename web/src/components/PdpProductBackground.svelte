<script lang="ts">
  /**
   * Product "Image" and "Background"
   */
  import { cmsProduct, pdpState, productDomStore } from '../stores/data'
  import { buildImage } from '../lib/ResponsiveImage'
  import { onDestroy, onMount } from 'svelte'
  import { globalState } from '../stores/global'

  const img = $cmsProduct?.productPage?.background
  const productImg = $cmsProduct?.image

  const imgProps = buildImage(img, {
    aspect: 1 / 1,
    sizes: { base: '100vw', sm: '70vw' },
  })

  $: productImgProps = buildImage(
    $pdpState.currentVariant.image || productImg,
    {
      aspect: 4 / 3,
      sizes: { base: '50vw', sm: '30vw' },
    }
  )

  const alt = $cmsProduct?.title || 'Will Call'

  onMount(() => {
    $globalState.invertManager.regiserLayoutItem($productDomStore.image)
  })

  onDestroy(() => {
    $globalState.invertManager.unregiserLayoutItem($productDomStore.image)
  })
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  @import '../style/breakpoints.scss';

  @keyframes move {
    0% {
      transform: translateY(200px) scale(1.2);
    }
    100% {
      transform: translateY(0) scale(1);
    }
  }

  .imgPanelWrapper {
    position: relative;
    /* layout for contained img */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 -#{$size-gutter};
    margin-top: -#{$size-gutter};
    margin-bottom: $size-gutter;
    height: 32rem;
    overflow: hidden;
    padding: $size-gutter 0;

    @include media('>=sm') {
      height: 20rem;
      margin-bottom: ms(3);
      margin-left: 0;
      height: 100vh;

      &:after {
        content: 'More Info ↓';
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 1;
        padding: $size-gutter;
        color: white;
      }
    }
  }

  .bg {
    animation: move 30s cubic-bezier(0.21, 0.02, 0.78, 1) infinite alternate;
    position: absolute;
    top: -200px;
    left: 0px;
    width: 100%;
    height: calc(100% + 200px);
    object-fit: cover;
    z-index: 1;
  }

  .product {
    width: 55%;
    height: 55%;
    object-fit: contain;
    z-index: 2;
  }
</style>

<div class="imgPanelWrapper" bind:this={$productDomStore.image}>
  <img {...imgProps} {alt} class="bg" />
  <img {...productImgProps} {alt} class="product" />
</div>
