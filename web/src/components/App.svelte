<script lang="ts">
  import type { Site } from '../types'
  import Nav from './Nav.svelte'
  import Preload from './Preload.svelte'
  import Seo from './Seo.svelte'

  export let data: Site

  $: [lat, lng] = [data.preload?.lat || 0, data.preload?.lng || 0]

  $: heading = data.preload?.preloadHead || null
  $: body = data.preload?.preloadBody || null

  $: baseTitle = data.seo?.title || 'FYi Design'
</script>

<style type="text/scss">
  // @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';
</style>

<Seo pageTitle={null} {baseTitle} />
<Nav>{lat}°N, {lng}°W</Nav>
<Preload {heading} {body} />
