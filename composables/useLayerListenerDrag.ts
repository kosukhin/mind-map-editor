import { watch } from '@vue/runtime-core'
import {
  useLayerEvents,
  useCurrentMap,
  useCanvasBoundaries,
  useLayer,
} from '~/composables'
import { allSet } from '~/entities'
import { applyArrowPoints, setProperty, unwrapTuple } from '~/utils'
import { layerDragHandler, layerDragObjectHandler } from '~/application'

export const useLayerListenerDrag = () => {
  const { firstMapLoad } = useCurrentMap()
  const { stage, layerObjects } = useLayer()
  const { map } = useCurrentMap()
  const { dragend, dragmove } = useLayerEvents()
  const { restrictBoundaries } = useCanvasBoundaries()

  watch(dragend, () => {
    allSet([dragend, map] as const)
      .map(unwrapTuple(layerDragHandler))
      .map(([object, position]) => {
        setProperty(object, 'position', [position.x, position.y])
      })
  })

  watch(dragmove, () => {
    allSet([dragmove, map] as const)
      .map(unwrapTuple(layerDragObjectHandler(layerObjects)))
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
