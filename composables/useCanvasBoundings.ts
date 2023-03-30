import Konva from 'konva'
import { useCanvas } from '~/composables/useCanvas'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '~/constants'
import Vector2d = Konva.Vector2d

export const useCanvasBoundings = () => {
  const { canvasSize } = useCanvas()

  const restrictBoundings = (pos: Vector2d) => {
    return canvasSize.map((vCanvasSize) => {
      const maxRight = CANVAS_WIDTH - vCanvasSize.w
      const maxBottom = CANVAS_HEIGHT - vCanvasSize.h

      const right = pos.x * -1
      const bottom = pos.y * -1

      if (maxBottom < 0 || maxRight < 0) {
        return { x: 0, y: 0 }
      }

      return {
        x: pos.x > 0 ? 0 : right > maxRight ? maxRight * -1 : pos.x,
        y: pos.y > 0 ? 0 : bottom > maxBottom ? maxBottom * -1 : pos.y,
      }
    }) as Vector2d
  }

  return {
    restrictBoundings,
  }
}
