<script lang="ts">
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
  <div class="h1">{heading}</div>
  <p class="p">{body}</p>
</div>
