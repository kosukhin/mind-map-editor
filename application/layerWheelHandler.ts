import { KonvaEventObject } from 'konva/lib/Node'
import curry from 'lodash/fp/curry'
import { CanvasSize, Stage } from '~/entities'
import { canvasRestrictBoundaries } from '~/application'

export const layerWheelHandler = curry(
  (canvasSize: CanvasSize, vStage: Stage, e: KonvaEventObject<WheelEvent>) => {
    try {
      e.evt.preventDefault()
      const dx = e.evt.deltaX
      const dy = e.evt.deltaY
      const x = vStage.x() - dx
      const y = vStage.y() - dy
      vStage.position(canvasRestrictBoundaries({ x, y }, canvasSize))
    } catch {
      return false
    }

    return true
  }
)
