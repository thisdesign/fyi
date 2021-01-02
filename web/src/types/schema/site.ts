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
    video?: unknown
  }
  inspiration?: {
    documents?: unknown[]
  }
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
