<script lang="ts">
  import { onMount } from 'svelte'

  import Cart from '../components/Cart.svelte'
  import CheckoutManager from '../components/CheckoutManager.svelte'
  import GridOverlay from '../components/GridOverlay.svelte'
  import { globalState } from '../stores/global'

  onMount(() => {
    $globalState.invertManager.watchScroll()
  })
</script>

<main>
  <CheckoutManager />
  <Cart />
  <GridOverlay />
  <slot />
</main>
