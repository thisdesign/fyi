<script lang="ts">
  import App from '../components/App.svelte'

  import { client } from '../lib/sanity'
  import type { Site } from '../types'

  const siteQuery = `
    *[_type == 'site' && _id == "site"][0]{
      ...,
      "general":{
        ...general,
        "backgroundVideo": general.backgroundVideo.asset->url
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
