import { addObjectToLayer } from '~/utils'
import { KonvaLayerObject, Layer, MapStructure } from '~/entities'

type Params = [Layer, MapStructure]
type Result = Array<[string, KonvaLayerObject[]]>

export const renderMapObjects = ([vLayer, vMap]: Params) => {
  const promises = []

  for (const object of Object.values(vMap.objects)) {
    promises.push(addObjectToLayer(vLayer, object, vMap))
  }

  return (fn: (values: Result) => void) => {
    Promise.all(promises).then((results) => {
      const resultValue = []
      results.forEach((curResult) => {
        resultValue.push([curResult[0].attrs.objectId, curResult])
      })

      fn(resultValue)
    })
  }
}
