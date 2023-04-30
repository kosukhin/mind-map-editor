import { watch } from '@vue/runtime-core'
import Konva from 'konva'
import debounce from 'lodash/debounce'
import {
  useLayerEvents,
  useMap,
  useCanvasBoundaries,
  useLayer,
  useLocks,
} from '~/composables'
import {
  addObjectToLayer,
  all,
  any,
  applyArrowPoints,
  removeObjectOnLayer,
  setProperty,
} from '~/utils'
import {
  calculateVisibleObjects,
  layerDragHandler,
  layerDragObjectHandler,
} from '~/application'
import { KonvaLayerObject } from '~/entities'

const calcRendering =
  (layerObjects) =>
  ([vDrag, vMap, vLayer]) => {
    if (vDrag.target instanceof Konva.Stage) {
      vLayer.destroyChildren()
      layerObjects.clear()
      const [visible, invisible] = calculateVisibleObjects(vMap, vDrag.target)
      visible.forEach(async (object) => {
        removeObjectOnLayer(layerObjects, object)
        const objects = await addObjectToLayer(vLayer, object, vMap, false)
        layerObjects.set(object.id, objects as KonvaLayerObject[])
      })
      invisible.forEach((object) => {
        removeObjectOnLayer(layerObjects, object)
      })
    }
  }

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
        calcRendering(layerObjects)
      )
    }, 500)
  )

  watch(firstMapLoad, () => {
    stage.map((vStage) => {
      vStage.dragBoundFunc(restrictBoundaries)
    })
  })
}
