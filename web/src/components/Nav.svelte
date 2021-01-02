<script lang="ts">
  import Logo from './Logo.svelte'
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: $size-margin;
    height: $size-nav;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    z-index: 90;
  }
</style>

<nav>
  <Logo />

  <div>
    <slot />
  </div>
</nav>
