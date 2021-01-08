<script lang="ts">
  import Logo from './Logo.svelte'

  const [lat, lng] = [0, 0]
  let isCords: boolean = true
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
    mix-blend-mode: difference;

    color: white;

    :global(*) {
      fill: white;
    }
  }

  .items {
    font-size: 16px;
    display: flex;
    position: relative;
    width: 100%;
    align-items: flex-end;

    .item {
      opacity: 0;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: flex-end;

      &.visible {
        opacity: 1;
      }
    }
  }

  ul {
    display: flex;

    li {
      margin-left: $spacer-1;
    }
  }
</style>

<nav>
  <Logo />

  <div class="items">
    <div class="item" class:visible={isCords}>{lat}°N, {lng}°W</div>
    <ul class="item" class:visible={!isCords}>
      <li><a href="#home">Home</a></li>
      <li><a href="#inspiration">Inspiration</a></li>
    </ul>
  </div>
</nav>
