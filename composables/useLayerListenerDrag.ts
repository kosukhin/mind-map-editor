import { watch } from '@vue/runtime-core'
import {
  useLayerEvents,
  useMap,
  useCanvasBoundaries,
  useLayer,
  useLocks,
} from '~/composables'
import { all, applyArrowPoints, setProperty } from '~/utils'
import { layerDragHandler, layerDragObjectHandler } from '~/application'

export const useLayerListenerDrag = () => {
  const { stage, layerObjects } = useLayer()
  const { firstMapLoad, map } = useMap()
  const { isClickLocked } = useLocks()
  const { dragend, dragmove } = useLayerEvents()
  const { restrictBoundaries } = useCanvasBoundaries()

  watch(dragend, () => {
    if (isClickLocked.value) return
    all([dragend, map] as const)
      .map(layerDragHandler)
      .map(([object, position]) => {
        setProperty(object, 'position', [position.x, position.y])
      })
  })

  watch(dragmove, () => {
    if (isClickLocked.value) return
    all([dragmove, map] as const)
      .map(layerDragObjectHandler(layerObjects))
      .map(({ text, arrows, relatedArrows }) => {
        text.map(([text, position]) => text.position(position))
        arrows.map(applyArrowPoints)
        relatedArrows.map(applyArrowPoints)
      })
  })

  watch(firstMapLoad, () => {
    stage.map((vStage) => {
      vStage.dragBoundFunc(restrictBoundaries)
    })
  })
}
