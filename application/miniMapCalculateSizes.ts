import { CanvasSize, Group, Size } from '~/entities'
import { CANVAS_HEIGHT, CANVAS_WIDTH, MINIMAP_SCALE } from '~/constants'

type Result = Size[]

export const miniMapCalculateSizes = (vCanvasSize: CanvasSize) => {
  const miniScreenWidth = vCanvasSize.w * MINIMAP_SCALE
  const miniScreenHeight = vCanvasSize.h * MINIMAP_SCALE
  const miniMapWidth = CANVAS_WIDTH * MINIMAP_SCALE
  const miniMapHeight = CANVAS_HEIGHT * MINIMAP_SCALE

  return Group<Result>([
    { w: miniMapWidth, h: miniMapHeight },
    { w: miniScreenWidth, h: miniScreenHeight },
  ])
}
