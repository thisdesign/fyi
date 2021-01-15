<script lang="ts">
  import PlayButton from './PlayButton.svelte'

  export let src: string
  export let poster: string | undefined

  let paused: boolean = true
  let node: HTMLVideoElement

  const play = () => node.play()
  const pause = () => node.pause()
</script>

<div class="video">
  {#if paused}
    <PlayButton />
  {/if}
  <!-- svelte-ignore a11y-media-has-caption -->
  <video
    {src}
    {poster}
    autoplay={false}
    bind:this={node}
    bind:paused
    on:click={() => (paused ? play() : pause())}
  />
</div>

<style type="text/scss">
  @import '../style/vars.scss';

  video {
    width: 100%;
    cursor: pointer;
    display: block;
  }

  .video {
    filter: brightness(0.96);
    position: relative;

    :global(svg) {
      pointer-events: none;
      height: $spacer-3;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 10;
      transform: translate3d(-50%, -50%, 0);
    }
  }
</style>
