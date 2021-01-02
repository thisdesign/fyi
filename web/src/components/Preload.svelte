<script lang="ts">
  import Logo from './Logo.svelte'
  import Type from './Type.svelte'

  export let heading: string | null
  export let body: string | null
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';

  .main {
    padding: $size-margin;
  }

  h2 {
    margin-bottom: $size-margin;
  }
</style>

<div class="main">
  <h2 class="h1">
    <Type text={heading || ''} />
  </h2>
  <p class="p">
    <Type text={body || ''} />
  </p>
</div>
