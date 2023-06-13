import flow from 'lodash/flow'
import { colorsMap } from '~/constants'
import {
  arrayShift,
  flatten,
  clone,
  inject,
  mathCeil,
  arrayMap,
  arraySort,
  ifEls,
  iterateGroup,
  nMathDivBy,
  objectCreate,
  objectValues,
  pass,
  prevResult,
  sortAsc,
  argsToArray,
  getOrFalse,
  and,
  getOrObject,
  getOrNull,
  getOrArray,
  f,
} from '~/utils/fp'

export const canvasCreateColorsHash = flow(
  f.do(
    ifEls,
    prevResult,
    f.doCtx(and, getOrFalse('settings'), getOrFalse('settings.colored')),
    flow(
      getOrObject('objects'),
      objectValues,
      f.do(arrayMap, prevResult, getOrNull('lastClick')),
      f.do(arraySort, prevResult, sortAsc),
      f.doCtx(argsToArray, prevResult, inject(clone(colorsMap))),
      f.doCtx(
        iterateGroup,
        f.doCtxDeep(
          2,
          pass,
          f.doCtx(
            flow(
              argsToArray,
              f.doCtx(
                arrayMap,
                getOrArray('[0]'),
                f.doCtxDeep(
                  2,
                  argsToArray,
                  getOrNull('[0]'),
                  getOrNull('[1][1]')
                )
              )
            ),
            getOrArray('[0]'),
            flow(getOrArray('[1][1]'), arrayShift)
          )
        ),
        getOrNull('[0].length'),
        flow(
          getOrNull('[0].length'),
          f.do(nMathDivBy, prevResult, 3),
          mathCeil
        ),
        getOrArray('[0]')
      )
    ),
    objectCreate
  ),
  flatten(1),
  Object.fromEntries
)
