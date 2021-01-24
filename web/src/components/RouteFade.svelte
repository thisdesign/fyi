<script lang="ts">
  import { fade } from 'svelte/transition'
</script>

<div in:fade out:fade><slot /></div>

<style type="text/scss">
  // @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';
</style>
