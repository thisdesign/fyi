<script context="module" lang="ts">
  import { client } from '../../lib/sanity'
  import type { Site } from '../../types'

  export async function preload(page: any, session: any) {
    const site = await client.fetch(siteQuery)
    return { site }
  }
</script>

<script lang="ts">
  import { siteQuery } from '../../queries'
  export let site: Site
  import Inspiration from '../../components/Inspiration.svelte'
  import Nav from '../../components/Nav.svelte'
  import RouteFade from '../../components/RouteFade.svelte'

  let items = site.inspiration || []

  let isCategoryLinkShown = site.showInspirationCategories
</script>

<title>Inspiration – FYi</title>
<Nav pageRoute="inspiration" />
<RouteFade>
  <Inspiration {items} {isCategoryLinkShown} />
</RouteFade>

<style type="text/scss">
  // @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';
</style>
