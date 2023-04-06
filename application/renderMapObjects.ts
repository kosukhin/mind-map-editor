import { addObjectToLayer } from '~/utils'
import { Layer, MapStructure } from '~/entities'

export const renderMapObjects = async (vLayer: Layer, vMap: MapStructure) => {
  const resultObjects = []

  for (const object of Object.values(vMap.objects)) {
    const objects = await addObjectToLayer(vLayer, object, vMap)
    resultObjects.push([object.id, objects])
  }

  return resultObjects
}
