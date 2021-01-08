import { writable } from 'svelte/store'

export const globalState = writable({
  isNavCords: true,
  isInspirationActive: false,
  isInspirationPeeking: false,
})
