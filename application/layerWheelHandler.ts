import { KonvaEventObject } from 'konva/lib/Node'
import curry from 'lodash/fp/curry'
import { Maybe, Stage, Vector2d } from '~/entities'

export const layerWheelHandler = curry(
  (vStage: Stage, e: KonvaEventObject<WheelEvent>) => {
    const result = Maybe<[Stage, Vector2d]>()
    e.evt.preventDefault()
    const dx = e.evt.deltaX
    const dy = e.evt.deltaY
    const x = vStage.x() - dx
    const y = vStage.y() - dy
    result.value = [vStage, { x, y }]

    return result
  }
)
