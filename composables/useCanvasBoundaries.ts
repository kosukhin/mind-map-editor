import { useCanvas } from '~/composables/useCanvas'
import { canvasRestrictBoundaries } from '~/application'
import { Vector2d } from '~/entities'
import { DEFAULT_BOUNDARIES } from '~/constants'
import { map } from '~/utils'

export function useCanvasBoundaries() {
  const { canvasSize } = useCanvas()
  const restrictBoundaries = (pos: Vector2d) =>
    map(canvasRestrictBoundaries(pos))(canvasSize).value ?? DEFAULT_BOUNDARIES

  return {
    restrictBoundaries,
  }
}
