<script lang="ts">
  import gsap from 'gsap'

  import { onMount } from 'svelte'

  export let lat: number
  export let lng: number

  let latCount = ''
  let lngCount = ''

  onMount(() => {
    const idk = (num: number, onUpdate: (val: string) => any) => {
      const count = { val: num - 1 }
      const NewVal = lat

      const tl = gsap.timeline()

      tl.to(count, {
        duration: 1,
        val: NewVal,
        roundProps: 'innerText',
        ease: 'expo.out',
        onUpdate: function () {
          onUpdate(count.val.toString())
        },
      })
    }

    idk(lat, (val) => (latCount = val))
    idk(lng, (val) => (lngCount = val))
  })
</script>

<div>{latCount}° N, {lngCount}° W</div>
