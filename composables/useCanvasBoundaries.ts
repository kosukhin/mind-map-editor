import { useCanvas } from '~/composables/useCanvas'
import { canvasRestrictBoundaries } from '~/application'
import { Vector2d } from '~/entities'

export const useCanvasBoundaries = () => {
  const { canvasSize } = useCanvas()

  const restrictBoundaries = (pos: Vector2d) =>
    canvasSize.map(canvasRestrictBoundaries(pos)).value as Vector2d

  return {
    restrictBoundaries,
  }
}
