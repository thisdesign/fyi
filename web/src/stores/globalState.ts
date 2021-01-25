import { writable } from 'svelte/store'

export const globalState = writable<{
  isNavCords: boolean
}>({
  isNavCords: true,
})
