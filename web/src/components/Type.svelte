<script lang="ts">
  import { onMount } from 'svelte'

  export let text: string
  export let speed = 1200

  let isMounted = false

  let chars = text.split('')

  onMount(() => {
    isMounted = true
  })

  function typeIn(node: Element, data: any) {
    const el: HTMLElement = (node as unknown) as HTMLElement

    return {
      duration: 0,
      delay: (speed / chars.length) * data.i,
      tick: (i: number) => {
        el.style.opacity = i.toString()
      },
    }
  }
</script>

{#if isMounted}
  {#each chars as char, i}<span in:typeIn={{ i }}>{char}</span>{/each}
{/if}

<style type="text/scss">
  span {
    opacity: 0;
  }
</style>
