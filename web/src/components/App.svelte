<script lang="ts">
  import type { Site } from '../types'
  import Preload from './Preload.svelte'

  export let data: Site

  $: [lat, lng] = [data.preload?.lat || 0, data.preload?.lng || 0]

  $: heading = data.preload?.preloadHead || null
  $: body = data.preload?.preloadBody || null
</script>

<style type="text/scss">
  // @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';
</style>

<Preload cords={[lat, lng]} {heading} {body} />
