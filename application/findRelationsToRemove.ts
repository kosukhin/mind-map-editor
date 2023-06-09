import flow from 'lodash/flow'
import get from 'lodash/get'
import set from 'lodash/set'
import { MapObject, MapStructure } from '~/entities/Map'
import {
  arrayForEach,
  arrayPush,
  eq,
  fromJson,
  ifElse,
  objectCreate,
  objectValues,
  pass,
} from '~/utils/fp'
import { Maybe } from '~/utils/maybe'
import { aliases } from '~/libraries/stepper/v2'

type RelativeObject = { objectId: string; indexes: string[] }

const { $, $s, $r, $v, $prev } = aliases

export const findRelationsToRemove2 = flow(
  $s(['vObject', 'vMap'], ['__debug']),
  $(fromJson, ['[]'], '$defaultRelations'),
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
                $(arrayPush, ['$indexes', '$index'])
              )
            ),
            $r('$arrows')
          )
        )
      ),
      $(get, ['$indexes', 'length']),
      ifElse(
        $v($(pass, [$prev])),
        flow(
          $(get, ['$relations', 'value', '$defaultRelations'], '$value'),
          $(arrayPush, ['$value', '$objectRelation']),
          $(set, ['$relations', 'value', '$value'])
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
