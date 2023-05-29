export const setElementPosition = (
  element: HTMLElement,
  [top, left]: [number, number]
) => {
  element.style.top = top + 'px'
  element.style.left = left + 'px'
}

export function findById(elementId: string) {
  return document.getElementById(elementId)
}
