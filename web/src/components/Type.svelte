<script lang="ts">
  import gsap from 'gsap'
  import { SplitText } from 'gsap/SplitText'

  import { onMount } from 'svelte'

  let el: HTMLElement
  export let text: string

  onMount(() => {
    let split = new SplitText(el, { type: 'words' })

    gsap.from(split.words, {
      duration: 0.5,
      y: 10,
      opacity: 0,
      stagger: 0.025,
      ease: 'Power4.out',
      onComplete: () => split.revert(),
    }),
      '+=0'
  })
</script>

<div bind:this={el}>{text}</div>
