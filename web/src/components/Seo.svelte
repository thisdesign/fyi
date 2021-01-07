<script lang="ts">
  import { urlFor } from '../lib/sanity'

  import type { SanityImage } from '../types'

  export let pageTitle: string | null
  export let baseTitle: string | null
  export let description: string | null
  export let image: string | SanityImage | null
  export let baseUrl: string
  export let pageUrl: string

  let title = pageTitle ? `${pageTitle} – ${baseTitle}` : baseTitle || ''

  const siteUrl = `${baseUrl}${pageUrl}`

  const imgUrl = (() => {
    if (typeof image === 'string') return image
    else if (image && image._type === 'image') {
      return urlFor(image)
        .width(1200)
        .height(630)
        .quality(70)
        .format('jpg')
        .url()
    }
  })()
</script>

<svelte:head>
  <!-- URL -->
  <link rel="canonical" href={siteUrl} />
  <meta property="og:url" content={siteUrl} />

  <!-- TITLE -->
  <title>{title}</title>

  <!-- DESCRIPTION -->
  {#if description}
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
  {/if}

  <!-- MISC -->
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta httpEquiv="Accept-CH" content="DPR, Width, Viewport-Width" />
  <meta property="og:title" content={title} />
  <meta property="og:locale" content="en_US" />

  <!-- Opengraph -->

  <!-- image -->
  {#if imgUrl}
    <meta property="og:image" content={imgUrl} />
    <meta name="twitter:image:src" content={imgUrl} />
  {/if}

  <meta property="og:type" content="page" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:url" content={siteUrl} />
</svelte:head>
