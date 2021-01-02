import { writable } from 'svelte/store'
import type { ProductSchema } from '../types'
import type { ProductSchemaVariant } from 'sanity-shopify-toolkit'

export const cmsProduct = writable<ProductSchema | null>(null)

type ProductState = {
  currentVariant: ProductSchemaVariant
  quantity: number
}

export const initialPdpState = {
  isGalleryOpen: false,
  isAnimationInFinished: false,
  isSubsequentPage: false,
  tl: null,
  isAnimating: false,
  quantity: 1,
  currentVariant: (null as unknown) as ProductSchemaVariant,
}

export const pdpState = writable<
  {
    isSubsequentPage: boolean
    isGalleryOpen: boolean
    isAnimationInFinished: boolean
    tl: gsap.core.Timeline | null
    isAnimating: boolean
  } & ProductState
>(initialPdpState)

/**
 * Product DOM
 */

export type El = Element | null

export type ProductDom = {
  desktopProduct: El
  mobileProduct: El
  detailsPane: El
  detailsPaneBottom: El
  imagePane: El
  image: El
  productHeader: El
  variantSelector: El
  addToCartBtn: El
  info: El
  productParent: El
  productUpper: El
  galleryShadow: El
  galleryImgs: El[]
  flktyGallery: El
  galleryHeader: El
  galleryFooter: El
  pdpShadow: El
}

export const initialDom = {
  desktopProduct: null,
  mobileProduct: null,
  detailsPane: null,
  detailsPaneBottom: null,
  imagePane: null,
  image: null,
  productHeader: null,
  variantSelector: null,
  addToCartBtn: null,
  info: null,
  productParent: null,
  productUpper: null,
  galleryShadow: null,
  galleryImgs: [],
  flktyGallery: null,
  galleryHeader: null,
  galleryFooter: null,
  pdpShadow: null,
}

export const productDomStore = writable<ProductDom>(initialDom)
