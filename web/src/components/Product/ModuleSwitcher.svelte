<script lang="ts">
  import { onMount } from 'svelte'
  import { productDomStore } from '../../stores/data'
  import { moveElement } from '../../util/moveElement'
  import type { ProductDom } from '../../stores/data'

  let isMobile = true
  let prevMobile = true

  const evaluateModules = (d: ProductDom) => {
    prevMobile = isMobile
    isMobile = window.innerWidth < 768
    if (!isMobile && prevMobile) {
      moveElement(d.image, d.imagePane)
      moveElement(d.info, d.imagePane)
      moveElement(d.productHeader, d.detailsPane, {
        method: 'insertBefore',
        reference: d.detailsPaneBottom,
      })
      moveElement(d.variantSelector, d.detailsPaneBottom)
      moveElement(d.addToCartBtn, d.detailsPaneBottom)
    }
    if (isMobile && !prevMobile) {
      moveElement(d.productHeader, d.mobileProduct)
      moveElement(d.image, d.mobileProduct)
      moveElement(d.variantSelector, d.mobileProduct)
      moveElement(d.info, d.mobileProduct)
      moveElement(d.addToCartBtn, d.mobileProduct)
    }
  }
  onMount(() => {
    evaluateModules($productDomStore)
    window.addEventListener('resize', () => evaluateModules($productDomStore))
  })
</script>

<slot />
