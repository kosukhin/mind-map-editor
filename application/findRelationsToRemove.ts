import flow from 'lodash/flow'
import { MapObject, MapStructure } from '~/entities/Map'
import { Maybe } from '~/utils/maybe'
import {
  argsToArray,
  arrayForEach,
  arrayMap,
  arrayPush,
  debug2,
  eq,
  f,
  fromJson,
  getOrArray,
  getOrNull,
  ifEls,
  objectValues,
  pass,
  prevResult,
  scalar,
  silentMap,
  toPool,
} from '~/utils/fp'

type RelativeObject = { objectId: string; indexes: string[] }

const onDebug = 1
export const findRelationsToRemove2 = flow(
  argsToArray,
  f.doCtx(
    toPool,
    flow(getOrArray('[1].objects'), objectValues),
    getOrNull('[0].id')
  ),
  debug2(onDebug, scalar('объектов:'), getOrNull('[0].length')),
  debug2(onDebug, scalar('id'), getOrNull('[1]')),
  f.doCtx(
    arrayMap,
    getOrArray('[0]'),
    f.doCtxDeep(
      2,
      pass,
      flow(
        f.doCtx(toPool, prevResult, f.do(fromJson, scalar('[]'))),
        debug2(onDebug, scalar('Текущий объект:'), getOrNull('[0][0]')),
        debug2(onDebug, scalar('related_id:'), getOrNull('[0][1][1]')),
        f.do(
          ifEls,
          pass,
          getOrNull('[0][0].arrows.length'),
          flow(
            f.doCtx(
              arrayForEach,
              getOrArray('[0][0].arrows'),
              f.doCtxDeep(
                2,
                pass,
                flow(
                  debug2(
                    onDebug,
                    scalar('id стрелки:'),
                    getOrNull('[0][0].id')
                  ),
                  debug2(
                    onDebug,
                    scalar('related_id:'),
                    getOrNull('[1][0][1][1]')
                  ),
                  f.do(
                    ifEls,
                    pass,
                    f.doCtx(
                      eq,
                      getOrNull('[0][0].id'),
                      getOrNull('[1][0][1][1]')
                    ),
                    flow(
                      debug2(
                        onDebug,
                        scalar('Пишем индекс:'),
                        getOrNull('[0][1]'),
                        scalar(', В массив:'),
                        getOrNull('[1][1]')
                      ),
                      silentMap(
                        f.doCtx(
                          arrayPush,
                          getOrArray('[1][1]'),
                          getOrNull('[0][1]')
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  ),
  debug2(onDebug, scalar('Результат'), prevResult)
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
