import { writable } from 'svelte/store'
import type { Checkout } from '../types'

export type ShopifyCart = {
  checkout: Checkout | null
  errorMsg: string | null
  // eslint-disable-next-line no-unused-vars
  addToCart: (variantId: string, qty: number) => void
  isCartOpen: boolean
}

export const shopifyCart = writable<ShopifyCart>({
  checkout: null,
  errorMsg: null,
  isCartOpen: false,
  addToCart: () => {},
})
