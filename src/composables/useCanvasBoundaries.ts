import partial from 'lodash/partial'
import { FType } from './../entities/Utils'
import { canvasRestrictBoundaries } from '@/application'
import { useCanvas } from '@/composables'
import { DEFAULT_BOUNDARIES } from '@/constants'
import { Size, Vector2d } from '@/entities'

const { canvasSize } = useCanvas()

const restrictBoundaries = (
  getCanvasSize: FType<Size | undefined>,
  pos: Vector2d
) => {
  const canvasSize = getCanvasSize()
  return canvasSize
    ? canvasRestrictBoundaries(pos)(canvasSize)
    : DEFAULT_BOUNDARIES
}

const module = {
  restrictBoundaries: partial(restrictBoundaries, () => canvasSize.value),
}

export const useCanvasBoundaries = () => module
