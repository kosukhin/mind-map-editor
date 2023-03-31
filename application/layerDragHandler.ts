import { KonvaEventObject } from 'konva/lib/Node'
import { MapObject, MapStructure, Maybe, Vector2d } from '~/entities'

export const layerDragHandler = (
  vDrag: KonvaEventObject<DragEvent>,
  vMap: MapStructure
) => {
  const result = Maybe<[MapObject, Vector2d]>()
  const currentObject = vMap.objects[vDrag.target.attrs.objectId]

  result.value = [
    currentObject,
    {
      x: vDrag.target.attrs.x,
      y: vDrag.target.attrs.y,
    },
  ]

  return result
}
