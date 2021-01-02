type Options = {
  method: 'appendChild' | 'insertBefore'
  reference: Element | null
}

export const moveElement = (
  target: Element | null,
  newParent: Element | null,
  options: Options | void
) => {
  const method = (options && options.method) || 'appendChild'
  const reference = (options && options.reference) || null

  if (!target) {
    console.error('moveElement: `target` element not found')
    return
  }

  if (!newParent) {
    console.error('moveElement: `newParent` element not found')
    return
  }

  if (method === 'appendChild' || !method) {
    newParent.appendChild(target)
    return
  }

  //  reference dependant

  if (!reference) {
    console.error('moveElement: `reference` element not found')
    return
  }

  if (method === 'insertBefore') {
    newParent.insertBefore(target, reference)
  }
}
