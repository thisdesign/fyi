<script context="module" lang="ts">
  import { client } from '../lib/sanity'
  import type { Site } from '../types'

  export async function preload(page: any, session: any) {
    const site = await client.fetch(siteQuery)
    return { site }
  }
</script>

<script lang="ts">
  import App from '../components/App.svelte'
  import { siteQuery } from '../queries'
  export let site: Site
</script>

<App data={site} />
