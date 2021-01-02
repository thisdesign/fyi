<script lang="ts">
  /**
   * A component that equally spaces characters
   */
  export let string: string
</script>

<style type="text/scss">
  .char {
    width: 0.57rem;
    text-align: center;
    display: inline-block;
  }
</style>

<span>
  {#each string.split('') as char}<span class="char">{char}</span>{/each}
</span>
