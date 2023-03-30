import { CanvasSize } from '~/entities/CanvasSize'

export const canvasCreateSize = (canvasElement: HTMLElement): CanvasSize => {
  return {
    w: canvasElement.clientWidth,
    h: canvasElement.clientHeight,
  }
}
