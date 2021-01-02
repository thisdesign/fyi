<script lang="ts">
  import { pdpState } from '../stores/data'
  import QtySelect from './QtySelect.svelte'

  let price = $pdpState.currentVariant.price.split('.')[0]
  $: qty = $pdpState.quantity

  let setQty = (qty: number) =>
    pdpState.update((state) => ({ ...state, quantity: qty }))
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  @import '../style/breakpoints.scss';

  .stateBar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: $size-gutter;
    grid-gap: $size-gutter;

    @include media('>=sm', '<1280px') {
      grid-gap: 0;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .price {
    grid-column: span 2;
  }
</style>

<div class="stateBar">
  <div class="price">{price} USD</div>
  <QtySelect value={qty} on:click={(e) => setQty(e.detail.val)} />
</div>
