import { KonvaEventObject } from 'konva/lib/Node'
import curry from 'lodash/fp/curry'
import {
  Arrow,
  Group,
  GroupInst,
  MapArrow,
  MapLayerObjects,
  MapObjectRelation,
  MapStructure,
  Maybe,
  MaybeInst,
  Text,
  Vector2d,
} from '~/entities'

interface Result {
  text: MaybeInst<[Text, Vector2d]>
  arrows: MaybeInst<[Arrow, number[]][]>
  relatedArrows: MaybeInst<[Arrow, number[]][]>
}

export const layerDragObjectHandler = curry(
  (
    layerObjects: MapLayerObjects,
    dragEvent: KonvaEventObject<DragEvent>,
    vMap: MapStructure
  ): GroupInst<Result> => {
    const result = Group<Result>({
      text: Maybe<[Text, Vector2d]>(),
      arrows: Maybe<[Arrow, number[]][]>(),
      relatedArrows: Maybe<[Arrow, number[]][]>(),
    })

    if (!dragEvent.target.attrs.image) {
      return result
    }

    const objectId = dragEvent.target.attrs.objectId
    const object = vMap.objects[objectId]
    const labelWidth = object.name.length * 7
    const type = vMap.types[object.type]
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [img, text, ...arrows] = layerObjects.get(objectId)

    result.value.text.value = [
      text,
      {
        x: dragEvent.target.attrs.x + type.width / 2 - labelWidth / 2,
        y: dragEvent.target.attrs.y - 15,
      },
    ]
    const resultArrows: [Arrow, number[]][] = []
    ;(arrows as MapArrow[]).forEach((arrow) => {
      const points = arrow.points()
      points[0] = dragEvent.target.attrs.x + type.width / 2
      points[1] = dragEvent.target.attrs.y + type.height / 2
      resultArrows.push([arrow, points])
    })
    result.value.arrows.value = resultArrows

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

    const resultRelatedArrows: [Arrow, number[]][] = []
    relatedArrows.forEach((relArrow) => {
      const points = relArrow.points()
      points[2] = dragEvent.target.attrs.x + type.width / 2
      points[3] = dragEvent.target.attrs.y + type.height / 2
      resultRelatedArrows.push([relArrow, points])
    })

    result.value.relatedArrows.value = resultRelatedArrows

    return result
  }
)
