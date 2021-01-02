import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImage } from '../types'

export const clientOptions = {
  dataset: 'production',
  projectId: 'fwv218fy',
  useCdn: process.env.NODE_ENV === 'production',
}

export const client = sanityClient(clientOptions)

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}
