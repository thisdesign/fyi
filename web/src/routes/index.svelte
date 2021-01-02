<script lang="ts">
  import { client } from '../lib/sanity'
  import type { Site } from '../types'

  const siteQuery = `*[_type == 'site'][0]`

  const site: Promise<Site> = client.fetch(siteQuery)
</script>

<style type="text/scss">
  // @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';
</style>

<div>asfd</div>
