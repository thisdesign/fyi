<script lang="ts">
  import Logo from './Logo.svelte'
  import Type from './Type.svelte'

  export let heading: string | null
  export let body: string | null
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';

  .preload {
    padding: $size-margin;
    padding-top: $size-nav;
    background: white;
    // border-radius: 0 0 $size-corner-radius $size-corner-radius;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h2 {
    margin-bottom: $size-margin;
  }
</style>

<div class="preload">
  <h2 class="h1">
    <Type text={heading || ''} />
  </h2>
  <p class="p">
    <Type text={body || ''} />
  </p>
</div>
