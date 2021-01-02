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
  }
</style>

<nav>
  <Logo />

  <div>
    <slot />
  </div>
</nav>
