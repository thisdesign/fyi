<script context="module" lang="ts">
  import { client } from '../lib/sanity'
  import type { Site } from '../types'

  export async function preload(page: any, session: any) {
    const siteQuery = `
      *[_type == 'site' && _id == "site"][0]{
          ...,
          "inspiration":inspiration.documents[]-> {
            image,
            "slug": slug->current,
            text,
            title,
            vimeoUrl,
            "category": category-> { 
              title,
              slug
            },
            href
          },
          "general":{
            ...general,
            "backgroundVideo": general.backgroundVideo.asset->url
          },
          "home":{
            ...home,
            "video": general.backgroundVideo.asset->url
          }
        }
      `
    const site = await client.fetch(siteQuery)

    return { site }
  }
</script>

<script lang="ts">
  import App from '../components/App.svelte'
  export let site: Site
</script>

<style type="text/scss">
  // @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';
</style>

<div>
  <App data={site} />
</div>
