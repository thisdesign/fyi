import type { SanityDocument } from '@sanity/client'
import type {
  ProductSchemaBasicInfo,
  ProductSchemaOptionCategoryValue,
  ProductSchemaOptions,
  ProductSchemaShopifyData,
} from 'sanity-shopify-toolkit'
import type { SanityBlockContent, SanityImage, SanitySlug } from '../sanity'

export type SuppliementalOptionVals = {
  baseName?: string
  measurement?: number
  unit?: string
  price?: number
  title?: string
}

export type ProductOptions = ProductSchemaOptions<
  {},
  SuppliementalOptionVals,
  {}
>

export type ProductOptionVals = ProductSchemaOptionCategoryValue &
  SuppliementalOptionVals

export type ProductPage = {
  series?: string
  seriesVariant?: string
  background?: SanityImage
  description?: SanityBlockContent
  notes?: ProductNotes
  feelsLike?: string
  smellsLike?: string
  related?: {
    series: string
    seriesVariant: string
    slug: SanitySlug
  }[]
  gallery?: SanityImage[]
}

export type ProductSchema = SanityDocument &
  ProductSchemaBasicInfo &
  ProductOptions &
  ProductSchemaShopifyData & {
    productPage?: ProductPage
    seo?: {
      description?: string
      title?: string
      metaImage?: SanityImage
    }
  }

export type ProductNotes = {
  base?: string
  middle?: string
  top?: string
}
