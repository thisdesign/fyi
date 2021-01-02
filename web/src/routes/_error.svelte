<script lang="ts">
  export let status: string
  export let error: any

  const dev = process.env.NODE_ENV === 'development'
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';

  div {
    padding: $size-gutter;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
  }

  h1 {
    font-size: ms(6);
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div>
  <h1>{status}</h1>
  <p class="mono">{error.message}</p>
</div>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
