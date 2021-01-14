<script lang="ts">
  export let url: string
  export let isPlaying: boolean
</script>

<div style="padding:56.25% 0 0 0;position:relative;">
  <iframe
    title=""
    src={`${url}?autoplay=${
      isPlaying ? 1 : 0
    }&color=ffffff&title=0&byline=0&portrait=0`}
    style="position:absolute;top:0;left:0;width:100%;height:100%;"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
  />
</div>

<style type="text/scss">
  // @import '../style/vars.scss';
  // @import '../style/breakpoints.scss';
</style>
