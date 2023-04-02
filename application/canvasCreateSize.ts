import { Size } from '~/entities/CanvasSize'

export const canvasCreateSize = (canvasElement: HTMLElement): Size => {
  return {
    w: canvasElement.clientWidth,
    h: canvasElement.clientHeight,
  }
}
