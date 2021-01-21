<script lang="ts">
  import gsap from 'gsap'
  import { onDestroy, onMount } from 'svelte'
  import { globalState } from '../stores/globalState'

  import type { NavRoute, Site } from '../types'
  import Home from './Home.svelte'
  import Inspiration from './Inspiration.svelte'
  import Nav from './Nav.svelte'
  import Preload from './Preload.svelte'
  import Seo from './Seo.svelte'

  export let data: Site

  let navThemeDark = true

  let hash = ''

  const handleHashChange = () => {
    $globalState.hash = window.location.hash.replace('#', '')
  }

  onMount(() => {
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange, false)
  })

  $: heading = data.preload?.preloadHead || null
  $: body = data.preload?.preloadBody || null

  $: [lat, lng] = [data.preload?.lat || 0, data.preload?.lng || 0]

  $: baseTitle = data.seo?.title || 'FYi Design'

  $: videoSrc = data.general?.backgroundVideo

  $: homeIntro = data.home?.intro || null
  $: homeBody = data.home?.paragraph || null
  $: homeVideoUrl = data.home?.video || null

  $: seoImg = data.seo?.metaImage || null
  $: seoDesc = data.seo?.description || null

  let isBelowHome = false

  let mobileHeight = 0

  onMount(() => {
    mobileHeight = window.innerHeight

    gsap.to('.space', {
      scrollTrigger: {
        trigger: '.space',
        toggleActions: 'play reverse play reverse',
        start: 'top top',
        onEnter: () => (navThemeDark = false),
        onLeave: () => {
          navThemeDark = true
          isBelowHome = true
        },

        onEnterBack: () => {
          navThemeDark = false
          isBelowHome = false
        },
        onLeaveBack: () => (navThemeDark = true),
      },
    })
  })

  let navRoute: NavRoute

  $: {
    if ($globalState.isInspirationActive) navRoute = 'INSPIRATION'
    else if (isBelowHome) navRoute = 'HOME'
    else if ($globalState.isNavCords) navRoute = 'INTRO'
    else navRoute = 'NONE'
  }
</script>

<Nav {lat} {lng} isDark={navThemeDark} route={navRoute} />
<Seo
  pageTitle={null}
  {baseTitle}
  image={seoImg}
  description={seoDesc}
  baseUrl="https://fyidesign.ca"
  pageUrl="/"
/>

<div class="scroll" style={`height: ${mobileHeight}`}>
  <div class="foreground">
    <Preload {heading} {body} />
    <div class="space" />
    <Home intro={homeIntro} body={homeBody} videoUrl={homeVideoUrl} />
  </div>
  <Inspiration items={data.inspiration || []} />
  <video src={videoSrc} autoplay loop muted />
</div>

<style type="text/scss">
  .scroll {
    overflow: hidden;
    height: 100vh;
    overflow: scroll;
  }
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

  .space {
    height: 100vh;
  }
</style>
