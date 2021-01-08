<script lang="ts">
  import type { Site } from '../types'
  import Home from './Home.svelte'
  import Inspiration from './Inspiration.svelte'
  import Preload from './Preload.svelte'
  import Seo from './Seo.svelte'

  export let data: Site

  $: heading = data.preload?.preloadHead || null
  $: body = data.preload?.preloadBody || null

  $: baseTitle = data.seo?.title || 'FYi Design'

  $: videoSrc = data.general?.backgroundVideo

  $: homeIntro = data.home?.intro || null
  $: homeBody = data.home?.paragraph || null
  $: homeVideoUrl = data.home?.video || null

  $: seoImg = data.seo?.metaImage || null
  $: seoDesc = data.seo?.description || null
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

<Seo
  pageTitle={null}
  {baseTitle}
  image={seoImg}
  description={seoDesc}
  baseUrl="https://google.com"
  pageUrl="/" />

<div class="foreground">
  <Preload {heading} {body} />
  <Home intro={homeIntro} body={homeBody} videoUrl={homeVideoUrl} />
  <Inspiration items={data.inspiration || []} />
</div>
<video src={videoSrc} autoplay loop muted />
