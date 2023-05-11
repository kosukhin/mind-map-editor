import { MapObject, MapStructure } from '~/entities'
import { Maybe } from '~/utils'

type RelativeObject = { objectId: string; indexes: string[] }

// Рассчитывает какие связи нужно удалить из зависимых объектов
export function findRelationsToRemove(vObject: MapObject, vMap: MapStructure) {
  const relations = Maybe<RelativeObject[]>()
  Object.values(vMap.objects).forEach((currentObject) => {
    const result: RelativeObject = { objectId: currentObject.id, indexes: [] }
    if (currentObject.arrows?.length) {
      for (const relationIndex in currentObject.arrows) {
        if (currentObject.arrows[relationIndex].id === vObject.id) {
          result.indexes.push(relationIndex)
          break
        }
      }
    }
    if (result.indexes.length) {
      if (!relations.value) {
        relations.value = []
      }
      relations.value?.push(result)
    }
  })
  return relations
}
