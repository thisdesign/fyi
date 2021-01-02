<script lang="ts">
  import type { Site } from '../types'
  import Home from './Home.svelte'
  import Nav from './Nav.svelte'
  import Preload from './Preload.svelte'
  import Seo from './Seo.svelte'

  export let data: Site

  $: [lat, lng] = [data.preload?.lat || 0, data.preload?.lng || 0]

  $: heading = data.preload?.preloadHead || null
  $: body = data.preload?.preloadBody || null

  $: baseTitle = data.seo?.title || 'FYi Design'

  $: videoSrc = data.general?.backgroundVideo

  $: homeIntro = data.home?.intro || null
  $: homeBody = data.home?.paragraph || null
  $: homeVideoUrl = data.home?.video || null
</script>

<style type="text/scss">
  // @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';

  video {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    object-fit: cover;
  }

  .foreground {
    position: relative;
    z-index: 10;
  }
</style>

<div class="foreground">
  <Seo pageTitle={null} {baseTitle} />
  <Nav>{lat}°N, {lng}°W</Nav>
  <Preload {heading} {body} />
  <Home intro={homeIntro} body={homeBody} videoUrl={homeVideoUrl} />
</div>
<video src={videoSrc} autoplay loop muted />
