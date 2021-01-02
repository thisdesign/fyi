<script lang="ts">
  import Type from './Type.svelte'

  export let heading: string | null
  export let body: string | null
  export let cords: [number, number]
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';
  nav {
    display: flex;
    justify-content: space-between;
    padding: $size-margin;
  }

  .main {
    padding: $size-margin;
  }
</style>

<nav>
  <div>logo</div>
  <div>{cords[0]}°N, {cords[1]}°W</div>
</nav>

<div class="main">
  <div class="h1">
    <Type text={heading || ''} />
  </div>
  <p class="p">
    <Type text={body || ''} />
  </p>
</div>
