<script lang="ts">
  import App from '../components/App.svelte'

  import { client } from '../lib/sanity'
  import type { Site } from '../types'

  const siteQuery = `
  *[_type == 'site' && _id == "site"][0]{
      ...,
      "inspiration":inspiration.documents[]-> {
        image,
        "slug": slug->current,
        text,
        title,
        vimeoUrl,
        "category": category->title,
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

  const site: Promise<Site> = client.fetch(siteQuery)
</script>

<style type="text/scss">
  // @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';
</style>

<div>
  {#await site}
    loading...
  {:then site}
    <App data={site} />
  {/await}
</div>
