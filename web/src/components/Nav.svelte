<script lang="ts">
  import { setInspirationActive } from '../stores/globalState'
  import type { NavRoute } from '../types'

  import Logo from './Logo.svelte'

  export let lat = 0
  export let lng = 0
  export let isDark: boolean

  export let route: NavRoute

  let isContactOpen = true

  $: currentRoute = route
  let prevRoute: NavRoute = 'NONE'

  $: isCords = route === 'INTRO'

  const setMouseOver = (r: NavRoute) => {
    prevRoute = currentRoute
    currentRoute = r
  }
  const setMouseOut = () => {
    currentRoute = prevRoute
  }
</script>

<nav class:isDark>
  <a href="/">
    <Logo />
  </a>

  <div class="items">
    <div class="item" class:visible={isCords}>{lat}°N, {lng}°W</div>
    <ul class="item" class:visible={!isCords}>
      <li
        class:active={currentRoute === 'HOME'}
        on:mouseover={() => setMouseOver('HOME')}
        on:mouseout={() => setMouseOut()}
      >
        <a href="#home">Home</a>
      </li>

      <li
        class:active={currentRoute === 'INSPIRATION'}
        on:mouseover={() => setMouseOver('INSPIRATION')}
        on:mouseout={() => setMouseOut()}
      >
        <a href="#inspiration" on:click={() => setInspirationActive(true)}
          >Inspiration</a
        >
      </li>

      <li
        on:mouseover={() => setMouseOver('CONTACT')}
        on:mouseout={() => setMouseOut()}
        class:active={currentRoute === 'CONTACT'}
        on:click={() => (isContactOpen = !isContactOpen)}
      >
        {#if isContactOpen}
          Contact
        {:else}
          email@goes.here.com
        {/if}
      </li>
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
