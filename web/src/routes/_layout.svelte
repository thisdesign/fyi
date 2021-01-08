<script lang="ts">
  import Nav from '../components/Nav.svelte'
  //  $: [lat, lng] = [data.preload?.lat || 0, data.preload?.lng || 0]
</script>

<main>
  <Nav />
  <slot />
</main>
