<script lang="ts">
  import gsap from 'gsap'
  import { SplitText } from 'gsap/SplitText'

  import { onMount } from 'svelte'

  let el: HTMLElement
  export let text: string

  onMount(() => {
    let split = new SplitText(el, { type: 'words' })

    gsap.from(split.words, {
      delay: 0.2,
      duration: 0.5,
      y: 15,
      opacity: 0,
      stagger: 0.02,
      ease: 'Power4.out',
      onComplete: () => split.revert(),
    }),
      '+=0'
  })
</script>

<div bind:this={el}>{text}</div>
