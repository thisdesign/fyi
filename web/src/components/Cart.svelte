<script lang="ts">
  import { onMount } from 'svelte'

  import { shopifyCart } from '../stores/cart'
  import { globalState } from '../stores/global'
  import Button from './Button.svelte'
  import QtySelect from './QtySelect.svelte'

  let cartNav: Element | null

  type CartData = {
    url: string
    subtotal: string
    items: {
      quantity: number
      title: string
      variantName: string
      image: string
      price: string
    }[]
  }

  let cartCount = 0
  let cartData: null | CartData = null
  let cartNode: Element | null
  let shadowNode: Element | null

  const handleCart = (open: boolean) => {
    shopifyCart.update((state) => ({ ...state, isCartOpen: open }))
  }

  $: {
    const checkout = $shopifyCart.checkout

    if (checkout) {
      cartCount = checkout.lineItems.reduce((acc, cur) => acc + cur.quantity, 0)

      cartData = {
        url: checkout.webUrl,
        subtotal: checkout.subtotalPrice,
        items: checkout.lineItems.map((item) => ({
          quantity: item.quantity,
          title: item.title,
          variantName: item.variant.title,
          price: item.variant.price,
          image: item.variant.image?.src || '',
        })),
      }
    }
  }

  $: {
    $globalState.invertManager.registerNavItem(cartNav)
  }
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  @import '../style/breakpoints.scss';

  $cols-xxs: 11;
  $cols-xs: 10;
  $cols-sm: 8;
  $cols-md: 6;
  $cols-lg: 5;

  .nav {
    position: fixed;
    right: 0;
    z-index: 10;
    color: white;
    padding: $size-gutter;
  }

  .outerCart {
    pointer-events: none;
    width: 100vw;
    height: 100vh;
    position: fixed;
    right: 0;
    z-index: 10;

    display: grid;
    grid-template-columns: repeat(12, 1fr);
    padding: 0 $size-gutter;
    grid-gap: $size-gutter;
  }

  .cart {
    pointer-events: all;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: scroll;
    background: white;
    margin: 0 -#{$size-gutter};
    transform: translate3d(100%, 0, 0);
    transition: 600ms 200ms transform $ease-in-out;

    &.open {
      transform: translate3d(0, 0, 0);
    }

    grid-column: (13 - $cols-xxs) / span $cols-xxs;

    @include media('>=xs') {
      grid-column: (13 - $cols-xs) / span $cols-xs;
    }

    @include media('>=sm') {
      grid-column: (13 - $cols-sm) / span $cols-sm;
    }

    @include media('>=md') {
      grid-column: (13 - $cols-md) / span $cols-md;
    }

    @include media('>=lg') {
      grid-column: (13 - $cols-lg) / span $cols-lg;
    }
  }

  :global(.pin) {
    padding: $size-gutter;
    position: sticky;
    background: white;
    z-index: 10;
  }

  .items {
    padding: 0 $size-gutter;
  }

  .checkoutButton {
    bottom: 0;
    @extend .pin;
  }

  .header {
    @extend .pin;
    top: 0;
    display: flex;
    justify-content: space-between;
  }

  .lineItem {
    display: grid;
    grid-gap: 0 $size-gutter;
    margin-bottom: ms(-1);

    grid-template-columns: repeat($cols-xxs, 1fr);

    @include media('>=xs') {
      grid-template-columns: repeat($cols-xs, 1fr);
    }
    @include media('>=sm') {
      grid-template-columns: repeat($cols-sm, 1fr);
    }
    @include media('>=md') {
      grid-template-columns: repeat($cols-md, 1fr);
    }
    @include media('>=lg') {
      grid-template-columns: repeat($cols-lg, 1fr);
    }
  }

  img {
    grid-column: span 3;
    grid-row: span 2;

    @include media('>=xs') {
      grid-column: span 2;
    }
    @include media('>=sm') {
      grid-column: span 2;
    }
    @include media('>=md') {
      grid-column: span 1;
    }
  }

  .product {
    grid-column: span 8;

    @include media('>=xs') {
      grid-column: span 4;
    }
    @include media('>=sm') {
      grid-column: span 3;
    }
    @include media('>=md') {
      grid-column: span 3;
    }
    @include media('>=lg') {
      grid-column: span 2;
    }
  }

  .qty {
    grid-column: 4 / span 5;

    @include media('>=xs') {
      grid-column: span 2;
    }
    @include media('>=md') {
      grid-column: span 1;
    }
  }

  .price {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    grid-column: span 3;

    @include media('>=xs') {
      grid-column: span 2;
    }
    @include media('>=sm') {
      grid-column: span 1;
    }
  }

  h4 {
    opacity: $opacity-standard;
  }

  .shadow {
    z-index: 9;
    opacity: 0;
    transition: 600ms opacity $ease-in-out;
    cursor: pointer;

    &.open {
      pointer-events: all;
      opacity: 1;
    }
  }
</style>

<button class="nav" bind:this={cartNav} on:click={() => handleCart(true)}>
  Cart —
  {cartCount}</button>

{#if cartData}
  <div
    class="shadow"
    bind:this={shadowNode}
    class:open={$shopifyCart.isCartOpen}
    on:click={() => handleCart(false)} />

  <div class="outerCart">
    <div class="cart" bind:this={cartNode} class:open={$shopifyCart.isCartOpen}>
      <div>
        <div class="header">
          <h2>Cart</h2>
          <button on:click={() => handleCart(false)}>&times;</button>
        </div>

        <ul class="items">
          {#each cartData.items as { quantity, title, image, variantName, price }}
            <li class="lineItem">
              <img src={image} alt={title} />
              <div class="product">
                <h3>{title}</h3>
                <h4>{variantName}</h4>
              </div>
              <div class="qty">
                <QtySelect
                  value={quantity}
                  on:click={(val) => console.log(val.detail.val)} />
              </div>
              <div class="price">${price}</div>
            </li>
          {/each}
        </ul>
      </div>
      <div class="checkoutButton">
        <a href={cartData.url} target="_blank" rel="noopener noreferrer">
          <Button>Checkout – ${cartData.subtotal}</Button>
        </a>
      </div>
    </div>
  </div>
{/if}
