import { writable } from 'svelte/store'

export const globalState = writable<{
  hash: string | null
  isNavCords: boolean
  isInspirationActive: boolean
  isInspirationPeeking: boolean
}>({
  hash: null,
  isNavCords: true,
  isInspirationActive: false,
  isInspirationPeeking: false,
})
