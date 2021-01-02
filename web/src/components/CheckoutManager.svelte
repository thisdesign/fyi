<script lang="ts">
  import { onMount } from 'svelte'
  import Client from 'shopify-buy'
  import { shopifyCart } from '../stores/cart'
  import { getCookie } from '../util/getCookie'
  import { createCookie } from '../util/createCookie'
  import type { Checkout } from '../types'

  onMount(() => {
    // init shopify client
    const client = Client.buildClient({
      storefrontAccessToken: '15be78d27ee10ca9f28dce0ccf25203c',
      domain: 'willcall.myshopify.com',
    })

    // error checker
    const setError = (err: string, e: string | null) => {
      console.error(err, e)
      shopifyCart.update((cart) => ({ ...cart, errorMsg: err }))
    }

    // cookie containing checkout id
    const cookieVal = getCookie('checkout_id')

    // set checkout and remove errors
    const setCheckout = (checkout: Checkout) =>
      shopifyCart.update((cart) => ({
        ...cart,
        checkout,
        errorMsg: null,
      }))

    // if an id has been set
    if (cookieVal) {
      client.checkout
        .fetch(cookieVal)
        .then((checkout) => setCheckout((checkout as unknown) as Checkout))
        .catch((e) => setError('There was an error fetching your cart.', e))
    } else {
      // create new checkout
      client.checkout
        .create()
        .then((checkout) => {
          createCookie('checkout_id', checkout.id.toString(), 90)
          setCheckout((checkout as unknown) as Checkout)
        })
        .catch((e) => setError('There was an error creating your cart.', e))
    }

    /**
     * Add line item to cart
     * @param variantId
     * @param quantity
     */
    const addToCart = (variantId: string, quantity: number) => {
      const checkoutId = $shopifyCart.checkout?.id

      if (!checkoutId) {
        setError('Cart has not been created yet.', null)
        return
      }

      const lineItem = { variantId: variantId, quantity: quantity }

      client.checkout
        .addLineItems(checkoutId.toString(), [lineItem])
        .then((checkout) => {
          shopifyCart.update((cart) => ({
            ...cart,
            checkout: (checkout as unknown) as Checkout,
            errorMsg: null,
            isCartOpen: true,
          }))
        })
        .catch((e) => {
          setError('There was an error adding this item.', e)
        })
    }

    // add functions
    shopifyCart.update((cart) => ({
      ...cart,
      addToCart,
    }))
  })
</script>

<slot />
