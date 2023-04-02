import { KonvaEventObject } from 'konva/lib/Node'
import curry from 'lodash/fp/curry'
import { Stage } from '~/entities'

export const layerWheelHandler = curry(
  (vStage: Stage, e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault()
    const dx = e.evt.deltaX
    const dy = e.evt.deltaY
    const x = vStage.x() - dx
    const y = vStage.y() - dy

    return [vStage, { x, y }]
  }
)
