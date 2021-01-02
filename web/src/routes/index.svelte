<script lang="ts">
  import gsap from 'gsap'

  const custom = (node: any, params: any) => {
    gsap.set(node, {
      position: 'absolute',
    })

    return {
      duration: 1000 * 1,
    }
  }
</script>

<style type="text/scss">
  // @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';
</style>

<div out:custom>
  <div>Will Call home</div>
  <div><a href="/products/quarantine-20b">quarantine-20b</a></div>
</div>
