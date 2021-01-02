<script lang="ts">
  import { onMount } from 'svelte'
  import type { ProductSchemaVariant } from 'sanity-shopify-toolkit'
  import { cmsProduct, pdpState } from '../../stores/data'
  import type { ProductSchema } from '../../types'

  let quantity = 1
  let currentVariant = ($cmsProduct as ProductSchema).options.variants[0]

  pdpState.update((state) => ({
    ...state,
    quantity,
    currentVariant,
  }))

  onMount(() => {
    // console.log($pdpState.currentVariant)
  })
</script>

<slot />
