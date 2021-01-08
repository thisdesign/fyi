import { writable } from 'svelte/store'

export const globalState = writable({
  isNavCords: true,
  isInspirationActive: false,
  isInspirationPeeking: false,
})

export const setInspirationActive = (cond: boolean) =>
  globalState.update((prev) => ({ ...prev, isInspirationActive: cond }))
