import curry from 'lodash/fp/curry'
import { addObjectToLayer } from '~/utils'
import { KonvaLayerObject, Layer, MapStructure } from '~/entities'

export const renderMapObjects = curry(
  async (
    layerObjects: Map<string, KonvaLayerObject[]>,
    vLayer: Layer,
    vMap: MapStructure
  ) => {
    try {
      for (const object of Object.values(vMap.objects)) {
        const objects = await addObjectToLayer(vLayer, object, vMap)

        if (objects) {
          layerObjects.set(object.id, objects)
        }
      }
    } catch {
      return false
    }

    return true
  }
)
