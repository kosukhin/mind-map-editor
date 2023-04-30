import { watch } from '@vue/runtime-core'
import debounce from 'lodash/debounce'
import {
  useLayerEvents,
  useMap,
  useCanvasBoundaries,
  useLayer,
  useLocks,
  useMapPartialRenderer,
} from '~/composables'
import { all, applyArrowPoints, setProperty } from '~/utils'
import { layerDragHandler, layerDragObjectHandler } from '~/application'

export const useLayerListenerDrag = () => {
  const { stage, layerObjects } = useLayer()
  const { firstMapLoad, map } = useMap()
  const { isDragLocked } = useLocks()
  const { dragend, dragmove, wheel } = useLayerEvents()
  const { restrictBoundaries } = useCanvasBoundaries()
  const { triggerPartialRendering } = useMapPartialRenderer()

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
      triggerPartialRendering()
    }, 500)
  )

  watch(firstMapLoad, () => {
    stage.map((vStage) => {
      vStage.dragBoundFunc(restrictBoundaries)
    })
  })
}
