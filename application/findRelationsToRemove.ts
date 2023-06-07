import flow from 'lodash/flow'
import get from 'lodash/get'
import set from 'lodash/set'
import { MapObject, MapStructure } from '~/entities'
import { arrayForEach, Maybe, objectCreate, objectValues } from '~/utils'
import { aliases } from '~/libraries/stepper/v2'

type RelativeObject = { objectId: string; indexes: string[] }

const { $, $s, $r } = aliases

export const findRelationsToRemove2 = flow(
  $s(['vObject', 'vMap'], ['relations', 'objects']),
  $(objectCreate),
  $(get, ['vMap', 'objects', 'prevResult']),
  $(objectValues, 'objects'),
  arrayForEach($(set, ['groups', 'prevResult', 'currentColor']), $r('objects'))
)

export const findRelationsToRemove = (
  vObject: MapObject,
  vMap: MapStructure
) => {
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
