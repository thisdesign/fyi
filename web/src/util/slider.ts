import gsap from 'gsap'

const set = (node: any) => {
  const y = window.scrollY

  gsap.set(node, {
    position: 'absolute',
    height: '100vh',
    overflow: 'scroll',
  })

  node.scroll(0, y)
}

const unset = (node: any) => {
  gsap.set(node, {
    height: 'auto',
    position: 'relative',
    overflow: 'visible',
  })

  node.scroll(0, 0)
}

export const slider = {
  set,
  unset,
}
