<script lang="ts">
  /**
   * Product page "Gallery" section
   */
  import { clearAllBodyScrollLocks } from 'body-scroll-lock'

  import { onDestroy, onMount } from 'svelte'
  import { buildImage } from '../lib/ResponsiveImage'
  import { cmsProduct, pdpState, productDomStore } from '../stores/data'
  import Button from './Button.svelte'
  import ProductHeader from './ProductHeader.svelte'

  let gallery = $cmsProduct?.productPage?.gallery
  let d = $productDomStore

  const images = gallery?.map((item) =>
    buildImage(item, {
      sizes: { base: '100vw', sm: '90vh' },
    })
  )

  onMount(() => {
    const Flickity = (<any>window).Flickity
    new Flickity(d.flktyGallery as HTMLElement, {
      wrapAround: true,
      pageDots: false,
    })

    window.addEventListener('wheel', handleWheel)
  })

  const handleWheel = (e: WheelEvent) => {
    if (!$pdpState.isGalleryOpen || $pdpState.isAnimating) return
    if (e.deltaY < -10) {
      handleGalleryClose()
    }
  }

  onDestroy(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('wheel', handleWheel)
  })

  const handleGalleryClose = () => {
    $pdpState.isGalleryOpen = false
    const tl = $pdpState.tl
    tl?.reverse().then(() => {
      clearAllBodyScrollLocks()
      pdpState.update((state) => ({ ...state, isAnimating: false }))
    })
  }
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  @import '../style/breakpoints.scss';

  $top: 4rem;
  $bottom: 4rem;

  .bar {
    padding: $size-gutter;
    position: absolute;
    z-index: 2;
    width: 100vw;
  }

  .header {
    display: grid;
    @extend .bar;
    grid-template-columns: repeat(3, 1fr);
    transform: translate3d(0, -100%, 0);
  }

  .footer {
    @extend .bar;
    display: flex;
    bottom: 0;
    justify-content: flex-end;
    transform: translate3d(0, 100%, 0);
  }

  .gallery {
    position: fixed;
    top: 0;
    overflow: hidden;
    background: white;
  }

  .flktyGallery {
    height: 100vh;
    width: 100vw;
    transform: translate3d(0, calc(50vh - 100px), 0);

    @include media('>=sm') {
      width: calc(100vw + 400px);
      transform: translate3d(200px, 0, 0);
      margin-left: -200px;
    }

    :global(.flickity-button) {
      display: none;
    }

    img {
      height: auto;
      width: 80vw;
      padding: calc(#{$size-gutter} / 2);
      transform: scale(1.1);

      @include media('>=sm') {
        height: 100vh;
        width: auto;
        max-width: 100vw;
        transform: scale(1.4);
        padding: 3.5rem 1rem 4.2rem;
        object-fit: contain;
      }
    }

    .imgWrap {
      height: 100vh;
      overflow: hidden;
      display: flex;
      align-items: center;
    }
  }

  .shadow {
    z-index: 1;
  }
</style>

<div class="gallery">
  <div class="header" bind:this={d.galleryHeader}>
    <ProductHeader on:close={handleGalleryClose} />
  </div>
  <div class="shadow" bind:this={d.galleryShadow} />
  <div bind:this={d.flktyGallery} class="flktyGallery">
    {#each images || [] as image, i}
      <div class="imgWrap">
        <img {...image} alt="Will Call" bind:this={d.galleryImgs[i]} />
      </div>
    {/each}
  </div>
  <div class="footer" bind:this={d.galleryFooter}>
    <Button size="md">Add To Cart</Button>
  </div>
</div>
