import gsap from 'gsap'
import { pdpState, ProductDom } from '../../stores/data'
import { disableBodyScroll } from 'body-scroll-lock'

export const handleGalleryClick = (dom: ProductDom) => {
  const galleryTl = gsap.timeline()

  pdpState.update((state) => ({
    ...state,
    isGalleryOpen: true,
    tl: galleryTl,
    isAnimating: true,
  }))

  disableBodyScroll(dom.flktyGallery as HTMLElement)

  galleryTl.to(dom.productUpper, {
    y: '-100vh',
    duration: 1,
    delay: 0.3,
    ease: 'Power3.easeInOut',
  })

  galleryTl.to(
    dom.flktyGallery,
    {
      x: 0,
      y: 0,
      duration: 1,
      ease: 'Power3.easeInOut',
    },
    '<'
  )

  galleryTl.to(
    dom.galleryShadow,
    {
      opacity: 0,
      ease: 'Power3.easeInOut',
      duration: 0.8,
      delay: 0.2,
    },
    '<'
  )

  galleryTl.to(dom.galleryImgs, {
    scale: 1,
    ease: 'Power3.easeInOut',
    duration: 0.6,
    delay: -0.2,
  })

  galleryTl.to(
    [dom.galleryHeader, dom.galleryFooter],
    {
      y: 0,
      ease: 'Power3.easeInOut',
      duration: 0.6,
    },
    '<'
  )
  galleryTl.then(() => {
    pdpState.update((state) => ({ ...state, isAnimating: false }))
  })
}
