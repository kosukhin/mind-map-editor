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
  d,
  dc,
  dcd,
  eq,
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
  dc(
    toPool,
    flow(getOrArray('[1].objects'), objectValues),
    getOrNull('[0].id')
  ),
  dc(
    arrayMap,
    getOrArray('[0]'),
    dcd(
      2,
      pass,
      flow(
        dc(toPool, prevResult, d(fromJson, scalar('[]'))),
        d(
          ifEls,
          pass,
          getOrNull('[0][0].arrows.length'),
          flow(
            silentMap(
              dc(
                arrayForEach,
                getOrArray('[0][0].arrows'),
                dcd(
                  2,
                  pass,
                  flow(
                    d(
                      ifEls,
                      pass,
                      dc(eq, getOrNull('[0][0].id'), getOrNull('[1][0][1][1]')),
                      flow(
                        silentMap(
                          dc(
                            arrayPush,
                            getOrArray('[1][1]'),
                            flow(
                              dc(
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
  d(
    arrayFilter,
    pass,
    flow(dc(varType, getOrNull('[0]')), dc(eq, prevResult, constant('string')))
  ),
  d(
    arrayMap,
    pass,
    flow(
      dc(
        argsToArray,
        dc(argsToArray, constant('objectId'), getOrNull('[0]')),
        dc(argsToArray, constant('indexes'), dc(argsToArray, getOrNull('[1]')))
      ),
      Object.fromEntries
    )
  ),
  dc(toPool, prevResult, Maybe),
  silentMap(dc(set, getOrObject('[1]'), constant('value'), getOrNull('[0]'))),
  getOrObject('[1]')
)
