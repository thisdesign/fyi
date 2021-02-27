import type { SanityDocument } from '@sanity/client'
import type { SanityBlockContent, SanityImage, SanitySlug } from '../sanity'

export type Site = SanityDocument & {
  _type: 'site'
  general?: {
    backgroundVideo?: string
    contactEmail?: string
  }
  home?: {
    intro?: SanityBlockContent
    paragraph?: SanityBlockContent
    video?: string
    twoCol?: boolean
    homeImage?: SanityImage
  }
  inspiration?: InspirationSchema[]
  preload?: {
    lat?: number
    lng?: number
    preloadBody?: string
    preloadHead?: string
  }
  seo?: {
    description?: string
    metaImage?: SanityImage
    title?: string
  }
  title?: string
}

export type InspirationSchema = {
  category?: { title: string; slug: SanitySlug }
  image?: SanityImage
  text?: SanityBlockContent
  title?: string
  video?: string
  href?: string
  layout?: number
}
