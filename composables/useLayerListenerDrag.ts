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
  useCanvas,
} from '~/composables'
import { all, applyArrowPoints, debug, setProperty } from '~/utils'
import { layerDragHandler, layerDragObjectHandler } from '~/application'

export function useLayerListenerDrag() {
  const { canvasSize } = useCanvas()
  const { stage, layerObjects } = useSharedLayer()
  const { firstMapLoad, map } = useSharedMap()
  const { isDragLocked } = useSharedLocks()
  const { dragend, dragmove, wheel } = useSharedLayerEvents()
  const { restrictBoundaries } = useCanvasBoundaries()
  const { triggerPartialRendering } = useMapPartialRenderer()
  let dragMoveInterval: any = null

  watch(dragend, () => {
    debug('debug fired', 'drag')
    if (isDragLocked.value) return
    all([dragend, map] as const)
      .map(layerDragHandler)
      .map(([object, position]) => {
        setProperty(object, 'position', [position.x, position.y])
      })
    dragMoveInterval && clearInterval(dragMoveInterval)
  })

  watch(dragmove, () => {
    if (isDragLocked.value) return
    all([stage, dragmove, canvasSize] as const).map(
      ([vLayer, vDMove, vSize]) => {
        if (
          vDMove.evt instanceof PointerEvent ||
          vDMove.evt instanceof TouchEvent
        ) {
          return
        }
        if (
          vDMove.target instanceof Konva.Image ||
          vDMove.target instanceof Konva.Group
        ) {
          const { offsetX: ofx, offsetY: ofy } = vDMove.evt
          const mustMove =
            ofx < 50 || ofx > vSize.w - 50 || ofy < 50 || ofy > vSize.h - 50

          if (!mustMove) {
            dragMoveInterval && clearInterval(dragMoveInterval)
            return
          }

          const offsetX = (Math.round(vSize.w / 2) - vDMove.evt.offsetX) / 10
          const offsetY = (Math.round(vSize.h / 2) - vDMove.evt.offsetY) / 10
          dragMoveInterval && clearInterval(dragMoveInterval)
          dragMoveInterval = setInterval(() => {
            vLayer.position(
              restrictBoundaries({
                x: vLayer.x() + offsetX,
                y: vLayer.y() + offsetY,
              })
            )
          }, 30)
        }
      }
    )
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
