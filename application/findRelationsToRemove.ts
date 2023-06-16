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

export const findRelationsToRemove = flow(
  argsToArray,
  f.doCtx(
    toPool,
    flow(getOrArray('[1].objects'), objectValues),
    getOrNull('[0].id')
  ),
  f.doCtx(
    arrayMap,
    getOrArray('[0]'),
    f.doCtxDeep(
      2,
      pass,
      flow(
        f.doCtx(toPool, prevResult, f.do(fromJson, scalar('[]'))),
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
                    f.do(
                      ifEls,
                      pass,
                      f.doCtx(
                        eq,
                        getOrNull('[0][0].id'),
                        getOrNull('[1][0][1][1]')
                      ),
                      flow(
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
      f.doCtx(eq, prevResult, constant('string'))
    )
  ),
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
  getOrObject('[1]')
)
