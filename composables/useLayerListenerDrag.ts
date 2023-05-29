import { watch } from '@vue/runtime-core'
import debounce from 'lodash/debounce'
import Konva from 'konva'
import {
  useSharedLayerEvents,
  useSharedMap,
  useCanvasBoundaries,
  useSharedLayer,
  useSharedLocks,
  useMapPartialRenderer,
} from '~/composables'
import { all, applyArrowPoints, debug, setProperty } from '~/utils'
import { layerDragHandler, layerDragObjectHandler } from '~/application'

export function useLayerListenerDrag() {
  const { stage, layerObjects } = useSharedLayer()
  const { firstMapLoad, map } = useSharedMap()
  const { isDragLocked } = useSharedLocks()
  const { dragend, dragmove, wheel } = useSharedLayerEvents()
  const { restrictBoundaries } = useCanvasBoundaries()
  const { triggerPartialRendering } = useMapPartialRenderer()

  watch(dragend, () => {
    debug('debug fired', 'drag')
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
  const partialRenderingDelay = 100
  watch(
    dragmove,
    debounce((e) => {
      if (e.value?.target && e.value.target instanceof Konva.Stage) {
        triggerPartialRendering()
      }
    }, partialRenderingDelay)
  )
  watch(
    wheel,
    debounce(() => {
      triggerPartialRendering()
    }, partialRenderingDelay)
  )
  watch(firstMapLoad, () => {
    stage.map((vStage) => {
      vStage.dragBoundFunc(restrictBoundaries)
    })
  })
}
