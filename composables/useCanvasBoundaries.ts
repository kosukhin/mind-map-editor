import { useCanvas } from '~/composables/useCanvas'
import { canvasRestrictBoundaries } from '~/application'
import { Vector2d } from '~/entities'
import { DEFAULT_BOUNDARIES } from '~/constants'

export const useCanvasBoundaries = () => {
  const { canvasSize } = useCanvas()

  const restrictBoundaries = (pos: Vector2d) =>
    canvasSize.map(canvasRestrictBoundaries(pos)).value ?? DEFAULT_BOUNDARIES

  return {
    restrictBoundaries,
  }
}
