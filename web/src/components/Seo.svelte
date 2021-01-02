<script lang="ts">
  export let pageTitle: string | null
  export let baseTitle: string | null

  let title = pageTitle ? `${pageTitle} – ${baseTitle}` : baseTitle
</script>

<style type="text/scss">
  // @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';
</style>

<svelte:head>
  <title>{title}</title>
</svelte:head>
