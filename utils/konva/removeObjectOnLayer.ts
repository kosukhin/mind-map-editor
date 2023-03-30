import { MapObject } from '~/entities'

export const removeObjectOnLayer = (
  layerObjects: Map<string, any>,
  object: MapObject
) => {
  const objects = layerObjects.get(object.id)
  objects.forEach((object: any) => object.remove())
}
