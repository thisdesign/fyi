<script context="module" lang="ts">
  export async function preload(page: any, session: any) {
    const { slug } = page.params

    const productQuery = `
    *[_type == "product" && slug.current == $slug][0] 
  `

    const cmsProductReq: ProductSchema = await client.fetch(productQuery, {
      slug,
    })

    return { cmsProductReq }
  }
</script>

<script lang="ts">
  import Product from '../../components/Product/Product.svelte'
  import { client } from '../../lib/sanity'
  import { cmsProduct } from '../../stores/data'
  import type { ProductSchema } from '../../types'

  export let cmsProductReq: ProductSchema
  cmsProduct.set(cmsProductReq)
</script>

<style>
</style>

<svelte:head>
  <title>{cmsProductReq.title}</title>
</svelte:head>

<Product />
