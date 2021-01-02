<script lang="ts">
  import ProductVariants from '../ProductVariants.svelte'
  import PdpProductBackground from '../PdpProductBackground.svelte'
  import ProductHeader from '../ProductHeader.svelte'
  import Info from '../Info.svelte'
  import { onDestroy } from 'svelte'
  import Button from '../Button.svelte'
  import { productDomStore, pdpState, initialPdpState } from '../../stores/data'
  import {
    animateIn,
    animateOut,
    animateShadowIn,
    animateShadowOut,
  } from './handleAnimation'
  import ProductGallery from '../ProductGallery.svelte'
  import { shopifyCart } from '../../stores/cart'
  import ProductStateHandler from './ProductStateHandler.svelte'
  import ModuleSwitcher from './ModuleSwitcher.svelte'
  import GalleryShim from './GalleryShim.svelte'

  let d = $productDomStore

  onDestroy(() => {
    pdpState.set({ ...initialPdpState })
  })
</script>

<style type="text/scss">
  @import '../../style/vars.scss';
  @import '../../style/breakpoints.scss';

  .product {
    position: relative;
    z-index: 2;
  }

  .desktopProduct,
  .mobileProduct {
    padding: $size-gutter;
    padding-bottom: 0;
    background: white;
    position: relative;
    z-index: 1;
    padding-bottom: $size-gutter;
  }

  .desktopProduct {
    display: none;

    @include media('>=sm') {
      display: grid;
      grid-template-columns: repeat(3, 3fr);
      grid-gap: $size-gutter;
    }
  }

  .mobileProduct {
    padding-top: 0;

    @include media('>=sm') {
      display: none;
    }
  }

  .imagePane {
    grid-column: span 2;
  }

  .detailsPane {
    position: sticky;
    top: #{$size-gutter};
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - calc(#{$size-gutter} * 2));
  }

  .cartButton {
    position: sticky;
    bottom: 0;

    @include media('<sm') {
      padding: ms(-1) $size-gutter;
      background: white;
      margin-left: -$size-gutter;
      margin-right: -$size-gutter;
    }
  }

  .upper {
    transform: translate3d(0, 0, 0);
    position: relative;
    z-index: 1;
  }
</style>

<ProductStateHandler />
<ModuleSwitcher />
<div
  class="shadow"
  bind:this={d.pdpShadow}
  in:animateShadowIn
  out:animateShadowOut />
<section
  class="product"
  bind:this={d.productParent}
  in:animateIn={d}
  out:animateOut={d}>
  <div class="upper" bind:this={d.productUpper}>
    <section class="mobileProduct" bind:this={d.mobileProduct}>
      <ProductHeader link="/" bind:node={d.productHeader} />
      <PdpProductBackground />
      <ProductVariants />
      <Info />

      <div class="cartButton" bind:this={d.addToCartBtn}>
        <Button
          on:click={() => {
            const id = $pdpState.currentVariant.id
            const formatted = window.btoa(`gid://shopify/ProductVariant/${id}`)
            $shopifyCart.addToCart(formatted, $pdpState.quantity)
          }}>
          Add to Cart
        </Button>
      </div>
    </section>

    <section class="desktopProduct" bind:this={d.desktopProduct}>
      <aside class="detailsPane" bind:this={d.detailsPane}>
        <div bind:this={d.detailsPaneBottom} />
      </aside>
      <aside class="imagePane" bind:this={d.imagePane} />
    </section>
    <GalleryShim />
  </div>

  {#if !$pdpState.isSubsequentPage || $pdpState.isAnimationInFinished}
    <ProductGallery />
  {/if}
</section>
