<script context="module" lang="ts">
  import { client } from '../../lib/sanity'
  import type { Site } from '../../types'

  export async function preload(page: any, session: any) {
    const site = await client.fetch(siteQuery)
    return { site }
  }
</script>

<script lang="ts">
  import Inspiration from '../../components/Inspiration.svelte'
  import Nav from '../../components/Nav.svelte'
  import { siteQuery } from '../../queries'
  export let site: Site
</script>

<style type="text/scss">
  @import '../../style/vars.scss';
  // @import '../style/breakpoints.scss';

  // .wrap {
  //   margin-top: $size-nav;
  //   padding: $size-margin;
  //   background: white;
  // }
</style>

<Nav />
<div>
  {#if site.inspiration}
    <Inspiration items={site.inspiration} standAlone />
  {/if}
</div>
