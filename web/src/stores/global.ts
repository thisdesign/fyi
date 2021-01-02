import { writable } from 'svelte/store'
import { InvertManager } from '../lib/InvertManager'

export const globalState = writable<{
  invertManager: InvertManager
}>({
  invertManager: new InvertManager(),
})
