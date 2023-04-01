import { watch } from '@vue/runtime-core'
import {
  useLayerEvents,
  useCurrentMap,
  useCanvasBoundaries,
  useLayer,
} from '~/composables'
import { allSet, MapArrow, MapObjectRelation } from '~/entities'
import { setProperty, unwrapTuple } from '~/utils'
import { layerDragHandler } from '~/application'

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
    allSet([dragmove, map] as const).map(([dragEvent, vMap]) => {
      if (!dragEvent.target.attrs.image) {
        return
      }

      const objectId = dragEvent.target.attrs.objectId
      const object = vMap.objects[objectId]
      const labelWidth = object.name.length * 7
      const type = vMap.types[object.type]
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [img, text, ...arrows] = layerObjects.get(objectId)

      text.position({
        x: dragEvent.target.attrs.x + type.width / 2 - labelWidth / 2,
        y: dragEvent.target.attrs.y - 15,
      })
      ;(arrows as MapArrow[]).forEach((arrow) => {
        const points = arrow.points()
        points[0] = dragEvent.target.attrs.x + type.width / 2
        points[1] = dragEvent.target.attrs.y + type.height / 2
        arrow.points(points)
      })
      const relatedArrows: MapArrow[] = []
      Object.values(vMap.objects).forEach((relObject) => {
        const hasRelation = (relObject.arrows as MapObjectRelation).find(
          (relArrow) => relArrow.id === object.id
        )
        if (hasRelation) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [img, text, ...arrows] = layerObjects.get(relObject.id)
          ;(arrows as any[]).forEach((arrow) => {
            if (arrow.attrs.toObjectId === object.id) {
              relatedArrows.push(arrow)
            }
          })
        }
      })
      relatedArrows.forEach((relArrow) => {
        const points = relArrow.points()
        points[2] = dragEvent.target.attrs.x + type.width / 2
        points[3] = dragEvent.target.attrs.y + type.height / 2
        relArrow.points(points)
      })
    })
  })

  watch(firstMapLoad, () => {
    stage.map((vStage) => {
      vStage.dragBoundFunc(restrictBoundaries)
    })
  })
}
