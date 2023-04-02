import { KonvaEventObject } from 'konva/lib/Node'
import { MapStructure } from '~/entities'

export const layerDragHandler = (
  vDrag: KonvaEventObject<DragEvent>,
  vMap: MapStructure
) => {
  const currentObject = vMap.objects[vDrag.target.attrs.objectId]

  return [
    currentObject,
    {
      x: vDrag.target.attrs.x,
      y: vDrag.target.attrs.y,
    },
  ]
}
