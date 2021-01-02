/* eslint-disable no-unused-vars */
import gsap from 'gsap'
import { slider } from '../../util/slider'
import { pdpState } from '../../stores/data'

const animProps = {
  delay: 0.3,
  y: '100vh',
  duration: 0.8,
  ease: 'Power3.easeInOut',
}

export const animateIn = (node: any, params: {}) => {
  pdpState.update((state) => ({ ...state, hasRouteChanged: true }))
  slider.set(node)

  const anim = gsap.from(node, { ...animProps })

  anim.then(() => {
    slider.unset(node)
    pdpState.update((state) => ({ ...state, isAnimationInFinished: true }))
    node.style.transform = 'none'
  })

  return {
    duration: anim.totalDuration() * 1000,
  }
}

export const animateOut = (node: any, params: {}) => {
  slider.set(node)

  const anim = gsap.to(node, { ...animProps })

  return { duration: anim.totalDuration() * 1000 + 800 }
}

export const animateShadowIn = (node: any, params = {}) => {
  const anim = gsap.from(node, {
    opacity: 0,
    ease: 'Power2.easeInOut',
  })
  return { duration: anim.totalDuration() * 1000 }
}
export const animateShadowOut = (node: any, params = {}) => {
  const anim = gsap.to(node, {
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: 'Power2.easeInOut',
  })
  return { duration: anim.totalDuration() * 1000 }
}
