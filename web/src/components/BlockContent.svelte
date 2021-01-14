<script lang="ts">
  import BlockContent from '@movingbrands/svelte-portable-text'
  import type { SanityBlockContent } from '../types'

  export let blocks: SanityBlockContent | null
</script>

{#if blocks}
  <BlockContent {blocks} />
{/if}

<style type="text/scss">
  // @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';
</style>
