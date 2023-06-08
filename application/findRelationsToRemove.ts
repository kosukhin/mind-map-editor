import flow from 'lodash/flow'
import get from 'lodash/get'
import set from 'lodash/set'
import { MapObject, MapStructure } from '~/entities'
import {
  arrayForEach,
  arrayPush,
  eq,
  fromJson,
  ifElse,
  Maybe,
  objectCreate,
  objectValues,
  pass,
} from '~/utils'
import { aliases } from '~/libraries/stepper/v2'

type RelativeObject = { objectId: string; indexes: string[] }

const { $, $s, $r, $v, $prev } = aliases

export const findRelationsToRemove2 = flow(
  $s(['vObject', 'vMap']),
  $(Maybe, '$relations'),
  $(get, ['vObject', 'id'], '$objectId'),
  $(objectCreate),
  $(get, ['vMap', 'objects', $prev]),
  $(objectValues, '$objects'),
  arrayForEach(
    flow(
      $(pass, ['prevResult'], '$currentObject'),
      $(fromJson, ['{objectId: null, indexes: []}'], '$objectRelation'),
      $(get, ['$objectRelation', 'indexes'], '$indexes'),
      $(get, ['$currentObject', 'id']),
      $(set, ['$objectRelation', 'objectId', $prev]),
      $(get, ['currentObject', 'arrows'], '$arrows'),
      $(get, ['$arrows', 'length', 0]),
      ifElse(
        $v($(pass, [$prev])),
        flow(
          arrayForEach(
            flow(
              $(get, [$prev, 'id'], '$currObjectId'),
              ifElse(
                $v($(eq, ['$currObjectId', '$objectId'])),
                flow($(arrayPush, ['$indexes', 'relationINdex']))
              )
            ),
            $r('$arrows')
          )
        )
      )
    ),
    $r('objects')
  ),
  $r('$relations')
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
