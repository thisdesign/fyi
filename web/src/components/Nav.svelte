<script lang="ts">
  import { onMount } from 'svelte'
  import Logo from './Logo.svelte'

  export let lat = 0
  export let lng = 0
  export let sticky: boolean = false
  export let isCords: boolean = false
  export let pageRoute: 'inspiration' | 'home'

  let isContactOpen = true
  let hoveredRoute: string | null = null

  const setMouseOver = (anchorRoute: string) => {
    hoveredRoute = anchorRoute
  }
  const setMouseOut = () => {
    hoveredRoute = null
  }

  $: currentRoute = hoveredRoute || pageRoute
</script>

<nav class:sticky>
  <a href="/" class="logo">
    <Logo />
  </a>

  <div class="items">
    <div class="item" class:visible={isCords}>{lat}°N, {lng}°W</div>
    <ul class="item" class:visible={!isCords}>
      <li
        class:active={currentRoute === 'home'}
        on:mouseover={() => setMouseOver('home')}
        on:mouseout={() => setMouseOut()}
      >
        <a href="/">Home</a>
      </li>

      <li
        class:active={currentRoute === 'inspiration'}
        on:mouseover={() => setMouseOver('inspiration')}
        on:mouseout={() => setMouseOut()}
      >
        <a href="/inspiration">Inspiration</a>
      </li>

      <li
        on:mouseover={() => setMouseOver('contact')}
        on:mouseout={() => setMouseOut()}
        class:active={currentRoute === 'contact'}
        on:click={() => (isContactOpen = !isContactOpen)}
      >
        {#if isContactOpen}
          Contact
        {:else}
          <a href="mailto:info@fyidesign.ca">info@fyidesign.ca</a>
        {/if}
      </li>
    </ul>
  </div>
</nav>

<style type="text/scss">
  @import '../style/vars.scss';

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
    color: black;

    transition: 200ms color ease;

    pointer-events: none;

    > * {
      pointer-events: all;
    }

    :global(*) {
      fill: black;
      transition: 200ms fill ease;
    }

    &.sticky {
      position: sticky;
    }
  }

  .logo {
    transition: 200ms opacity ease;
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
      cursor: pointer;

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

        border-bottom: 1px solid black;
      }
    }
  }
</style>
