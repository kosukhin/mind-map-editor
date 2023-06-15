import flow from 'lodash/flow'
import set from 'lodash/set.js'
import { Maybe } from '~/utils/maybe'
import {
  argsToArray,
  arrayFilter,
  arrayForEach,
  arrayMap,
  arrayPush,
  constant,
  debug2,
  eq,
  f,
  flatten,
  fromJson,
  getOrArray,
  getOrNull,
  getOrObject,
  ifEls,
  objectValues,
  pass,
  prevResult,
  scalar,
  silentMap,
  toPool,
  varType,
} from '~/utils/fp'

const onDebug = 0
export const findRelationsToRemove = flow(
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
            silentMap(
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
                      scalar('id текущего объекта:'),
                      getOrNull('[1][0][0].id')
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
                            flow(
                              f.doCtx(
                                toPool,
                                getOrNull('[1][0][0].id'),
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
            ),
            debug2(onDebug, scalar('Индексы'), getOrNull('[1]')),
            getOrNull('[1]')
          )
        )
      )
    )
  ),
  flatten(1),
  f.do(
    arrayFilter,
    pass,
    flow(
      f.doCtx(varType, getOrNull('[0]')),
      debug2(onDebug, scalar('Тип'), prevResult),
      f.doCtx(eq, prevResult, constant('string'))
    )
  ),
  debug2(onDebug, scalar('Перед map'), prevResult),
  f.do(
    arrayMap,
    pass,
    flow(
      f.doCtx(
        argsToArray,
        f.doCtx(argsToArray, constant('objectId'), getOrNull('[0]')),
        f.doCtx(
          argsToArray,
          constant('indexes'),
          f.doCtx(argsToArray, getOrNull('[1]'))
        )
      ),
      Object.fromEntries
    )
  ),
  f.doCtx(toPool, prevResult, Maybe),
  silentMap(
    f.doCtx(set, getOrObject('[1]'), constant('value'), getOrNull('[0]'))
  ),
  getOrObject('[1]'),
  debug2(onDebug, scalar('Результат'), prevResult)
)
