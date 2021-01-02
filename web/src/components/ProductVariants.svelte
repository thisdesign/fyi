<script lang="ts">
  import type { ProductSchemaOptionMeta } from 'sanity-shopify-toolkit'

  /**
   * "Variants" block
   */
  import { cmsProduct, pdpState, productDomStore } from '../stores/data'
  import type { SuppliementalOptionVals } from '../types'
  import EqualSpace from './EqualSpace.svelte'
  import ProductQtyAndPrice from './ProductQtyAndPrice.svelte'

  let categories =
    $cmsProduct?.options.categories.map((category) => ({
      name: category.name,
      values: category.values.map((variant) => {
        const v = variant as SuppliementalOptionVals

        return {
          name: v.baseName,
          title: v.title,
          unit: v.unit,
          value: v.measurement,
          price: v.price,
        }
      }),
    })) || []

  $: isSelected = (val: string | undefined, categoryName: string) => {
    if (!val) {
      console.error('Error: no variant name')
      return false
    }

    return (
      $pdpState.currentVariant.selectedOptions.findIndex(
        (i) => i.categoryName === categoryName && i.value == val
      ) !== -1
    )
  }

  $: updateVariant = (options: ProductSchemaOptionMeta) => {
    const currentEnabledOptions = $pdpState.currentVariant.selectedOptions
    const newOptions = currentEnabledOptions.map((option) =>
      option.categoryName === options.categoryName ? options : option
    )

    const variants = $cmsProduct?.options.variants || []

    const matchingVariant = variants.find((variant) => {
      // Check each options and see if they both match 'newOptions'
      const variantMatches = variant.selectedOptions
        .map((variantCandidateOption) => {
          const hasMatch = newOptions.find(
            (newOption) =>
              newOption.categoryName === variantCandidateOption.categoryName &&
              newOption.value === variantCandidateOption.value
          )

          return hasMatch
        })
        .filter((a) => a)

      const isMatch = variantMatches.length === newOptions.length
      return isMatch ? variant : null
    })

    pdpState.update((state) => ({
      ...state,
      currentVariant: matchingVariant || state.currentVariant,
    }))
  }
</script>

<style type="text/scss">
  @import '../style/vars.scss';
  @import '../style/breakpoints.scss';

  li {
    cursor: pointer;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    color: rgba(0, 0, 0, $opacity-standard);
    grid-gap: $size-gutter;
  }

  ul {
    margin-bottom: ms(-1);
  }

  .active {
    color: rgba(0, 0, 0, 1);
  }

  .name {
    grid-column: span 2;
  }

  .categoryName {
    margin-top: $size-gutter;
    margin-bottom: 0.25rem;
  }

  // awkward zone
  @include media('>=sm', '<1280px') {
    li {
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 0;
    }
    .name {
      grid-column: span 1;
    }
  }
</style>

{#if categories}
  <div bind:this={$productDomStore.variantSelector}>
    {#each categories as { name: categoryName, values }}
      {#if categories.length > 1}
        <div class="categoryName">({categoryName})</div>
      {/if}
      <ul>
        {#each values as { name, unit, price, value, title }, i}
          <li
            class:active={isSelected(title, categoryName)}
            on:click={() => updateVariant({
                categoryName,
                value: title || '',
              })}>
            <div class="name">{name}</div>
            <div>
              {#if value && unit}
                <EqualSpace
                  string={(value && value.toString().padStart(2, '0')) || ''} />
                {unit}
              {/if}
            </div>
            <div>
              <EqualSpace
                string={(price && price.toString().padStart(3, '0')) || ''} />
              USD
            </div>
          </li>
        {/each}
      </ul>
    {/each}
    <ProductQtyAndPrice />
  </div>
{/if}
