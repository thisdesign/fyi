<script lang="ts">
  import { globalState, setInspirationActive } from '../stores/globalState'
  import type { NavRoute } from '../types'

  import Logo from './Logo.svelte'

  export let lat = 0
  export let lng = 0
  export let isDark: boolean

  export let route: NavRoute
  $: isCords = route === 'INTRO'
</script>

<nav class:isDark>
  <a href="/">
    <Logo />
  </a>

  <div class="items">
    <div class="item" class:visible={isCords}>{lat}°N, {lng}°W</div>
    <ul class="item" class:visible={!isCords}>
      <li class:active={route === 'HOME'}><a href="#home">Home</a></li>
      <li class:active={route === 'INSPIRATION'}>
        <a href="#inspiration" on:click={() => setInspirationActive(true)}
          >Inspiration</a
        >
      </li>
      <li>Contact</li>
    </ul>
  </div>
</nav>

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
    color: white;

    transition: 200ms color ease;

    :global(*) {
      fill: white;
      transition: 200ms fill ease;
    }

    &.isDark {
      color: black;

      :global(*) {
        fill: black;
      }
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
      transition: 300ms opacity ease;

      &.visible {
        opacity: 1;
      }
    }
  }

  ul {
    display: flex;

    li {
      margin-left: $spacer-2;
      position: relative;

      &.active:after {
        width: 100%;
      }

      &:after {
        content: '';
        position: absolute;
        width: 0;
        bottom: -1px;
        left: 0;

        transition: 500ms width ease-in-out;

        border-bottom: 1px solid white;

        .isDark & {
          border-bottom: 1px solid black;
        }
      }
    }
  }
</style>
