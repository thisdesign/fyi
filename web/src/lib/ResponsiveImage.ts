import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import type { SanityImage } from '../types'
import { urlFor } from './sanity'

const SIZES = [150, 300, 600, 900, 1200, 1440, 2400, 4000]

type UrlOptions = {
  quality?: number
  auto?: 'format' | null
  format?: 'jpg' | 'pjpg' | 'png' | 'webp' | null
  aspect?: number
  defaultWidth?: number
  sizes?: {
    [k: string]: string
  }
}

type Breakpoints = Record<string, number>

type ImgProps = {
  src: string
  srcSet: string
  sizes: string
}

type Size<T> = {
  sizes?: Partial<Record<keyof T | 'base', string>>
}

class ResponsiveImageBuilder<T> {
  breakpoints: T

  constructor(t: T) {
    this.breakpoints = t
  }

  public getImage = (
    src: SanityImage | undefined,
    urlOptions: (UrlOptions & Size<T>) | void
  ) => {
    return new ResponsiveImage(
      src,
      urlOptions,
      (this.breakpoints as unknown) as Breakpoints
    ).getProps()
  }
}

export class ResponsiveImage {
  private src: SanityImage | undefined
  private urlOptions: UrlOptions
  private breakpoints: Breakpoints

  constructor(
    src: SanityImage | undefined,
    urlOptions: UrlOptions | void,
    breakpoints: Breakpoints
  ) {
    this.src = src
    this.urlOptions = urlOptions ? urlOptions : {}
    this.breakpoints = breakpoints
  }

  /**
   * Returns responsive image props
   */
  getProps(): ImgProps | null {
    if (!this.src) return null

    let builder = this.getBuilder()
    if (!builder) return null

    // get img for "src" tag
    const baseSrc = this.createWidth(
      builder,
      this.urlOptions.defaultWidth
    ).url()

    // get each size and make a url for it
    const srcSet = SIZES.map((size) => {
      const url = this.createWidth(builder as ImageUrlBuilder, size).url()
      return `${url} ${size}w`
    }).join(', ')

    return {
      src: baseSrc || '',
      srcSet: srcSet,
      sizes: this.getSizes(),
    }
  }

  private getSizes = () => {
    const sizes = this.urlOptions.sizes || {}
    const { base = '100vw', ...s } = sizes

    const sizeStrings = Object.keys(s).map(
      (item) => `(min-width: ${this.breakpoints[item]}px) ${s[item]}`
    )

    return sizeStrings.length ? [sizeStrings.join(', '), base].join(', ') : base
  }

  /**
   * initializes a builder module with reasonable defaultws
   */
  private getBuilder = (): ImageUrlBuilder | null => {
    if (!this.src) return null
    let builder = urlFor(this.src).quality(this.urlOptions.quality || 80)

    // if auto isn't defined, set to format
    if (this.urlOptions.auto === undefined) {
      builder = builder.auto('format')
    }

    // if format isn't defined, set to jpg format
    if (this.urlOptions.format === undefined) {
      builder = builder.format('jpg')
      // and if it's null don't do anything
    } else if (this.urlOptions.format !== null) {
      // and if its something, set it to that something
      builder = builder.format(this.urlOptions.format)
    }

    return builder
  }

  /**
   * Builds a image with a width (and aspect if applicable)
   * @param builder urlBuilder
   * @param w width to build
   */
  private createWidth = (builder: ImageUrlBuilder, w: number = 1200) => {
    builder = builder.width(w)

    if (this.urlOptions.aspect) {
      builder = builder.height(Math.round(w * this.urlOptions.aspect))
    }

    return builder
  }
}

export const buildImage = new ResponsiveImageBuilder({
  xs: 576,
  sm: 768,
  md: 1024,
  lg: 1440,
  xl: 1900,
}).getImage
