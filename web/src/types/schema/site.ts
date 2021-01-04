import type { SanityDocument } from '@sanity/client'
import type { SanityBlockContent, SanityImage } from '../sanity'

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
  category?: string
  image?: SanityImage
  text?: SanityBlockContent
  title?: string
  vimeoUrl?: string
  href?: string
}
