<script context="module" lang="ts">
  import { client } from '../../lib/sanity'
  import type { Site } from '../../types'

  export async function preload(page: any, session: any) {
    const site = await client.fetch(siteQuery)

    return {
      site,
      category: page.params.category,
    }
  }
</script>

<script lang="ts">
  import Inspiration from '../../components/Inspiration.svelte'
  import Nav from '../../components/Nav.svelte'
  import { siteQuery } from '../../queries'
  import RouteFade from '../../components/RouteFade.svelte'

  export let site: Site
  export let category: string

  let categoryName: string | null = null
  let items = site.inspiration || []

  let filteredItems = items.filter(
    (item) => item.category?.slug.current === category
  )
  let itemsToDisplay = category ? filteredItems : items
  $: categoryName = filteredItems[0].category?.title || null
</script>

<Nav pageRoute="inspiration" />
<RouteFade>
  {#if site.inspiration}
    <Inspiration items={itemsToDisplay} category={categoryName} />
  {/if}
</RouteFade>
