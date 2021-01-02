export class InvertManager {
  navItems: any[]
  layoutItems: any[]

  constructor() {
    this.navItems = []
    this.layoutItems = []
  }

  private eval = () => {
    console.log(this.layoutItems)

    this.navItems.forEach((item) => {
      const navRect = item.getBoundingClientRect()

      this.layoutItems.forEach((node) => {
        const objRect = node.getBoundingClientRect()

        const isInverted =
          navRect.right < objRect.left ||
          navRect.left > objRect.right ||
          navRect.bottom - navRect.height / 2 < objRect.top ||
          navRect.top + navRect.height / 2 > objRect.bottom

        if (isInverted) {
          item.style.color = 'black'
        } else {
          item.style.color = 'white'
        }
      })
    })
  }

  watchScroll() {
    window.addEventListener('scroll', this.eval, { passive: true })
    window.addEventListener('resize', this.eval, { passive: true })
  }

  registerNavItem(el: Element | null) {
    if (!el) return
    this.navItems = [...this.navItems, el]
    this.eval()
  }

  // unregisterNavItem(el: Element | null) {
  //   if (!el) return
  //   console.log(el)
  //   this.eval()
  // }

  regiserLayoutItem(el: Element | null) {
    if (!el) return
    this.layoutItems = [...this.layoutItems, el]
    this.eval()
  }

  unregiserLayoutItem(el: Element | null) {
    if (!el) return
    this.layoutItems = this.layoutItems.filter((item) => item !== el)
    this.eval()
  }
}
