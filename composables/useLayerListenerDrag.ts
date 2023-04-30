import { watch } from '@vue/runtime-core'
import debounce from 'lodash/debounce'
import Konva from 'konva'
import {
  useLayerEvents,
  useMap,
  useCanvasBoundaries,
  useLayer,
  useLocks,
} from '~/composables'
import { all, any, applyArrowPoints, setProperty } from '~/utils'
import { layerDragHandler, layerDragObjectHandler } from '~/application'
import { renderVisibleMapObjects } from '~/application/renderVisibleMapObjects'

export const useLayerListenerDrag = () => {
  const { stage, layer, layerObjects } = useLayer()
  const { firstMapLoad, map } = useMap()
  const { isDragLocked } = useLocks()
  const { dragend, dragmove, wheel } = useLayerEvents()
  const { restrictBoundaries } = useCanvasBoundaries()

  watch(dragend, () => {
    if (isDragLocked.value) return
    all([dragend, map] as const)
      .map(layerDragHandler)
      .map(([object, position]) => {
        setProperty(object, 'position', [position.x, position.y])
      })
  })

  watch(dragmove, () => {
    if (isDragLocked.value) return
    all([dragmove, map] as const)
      .map(layerDragObjectHandler(layerObjects))
      .map(({ text, arrows, relatedArrows, additionalText }) => {
        text.map(([text, position]) => text.position(position))
        arrows.map(applyArrowPoints)
        relatedArrows.map(applyArrowPoints)
        additionalText.map(([text, position]) => text.position(position))
      })
  })

  watch(
    [dragmove, wheel],
    debounce(() => {
      all([any([dragmove, wheel]), map, layer] as const).map(
        ([vDrag, vMap, vLayer]) => {
          if (vDrag.target instanceof Konva.Stage) {
            renderVisibleMapObjects(layerObjects)([vDrag.target, vMap, vLayer])
          }
        }
      )
    }, 500)
  )

  watch(firstMapLoad, () => {
    stage.map((vStage) => {
      vStage.dragBoundFunc(restrictBoundaries)
    })
  })
}
