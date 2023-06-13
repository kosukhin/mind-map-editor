import flow from 'lodash/flow'
import { colorsMap } from '~/constants'
import {
  arrayShift,
  cFlatten,
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
  connectFn,
  doFn,
  doFnDeep,
  argsToArray,
  getOrFalse,
  and,
  getOrObject,
  getOrNull,
  getOrArray,
} from '~/utils/fp'

export const canvasCreateColorsHash = flow(
  connectFn(
    ifEls,
    prevResult,
    doFn(and, getOrFalse('settings'), getOrFalse('settings.colored')),
    flow(
      getOrObject('objects'),
      objectValues,
      connectFn(arrayMap, prevResult, getOrNull('lastClick')),
      connectFn(arraySort, prevResult, sortAsc),
      doFn(argsToArray, prevResult, inject(clone(colorsMap))),
      doFn(
        iterateGroup,
        doFnDeep(
          2,
          pass,
          doFn(
            flow(
              argsToArray,
              doFn(
                arrayMap,
                getOrArray('[0]'),
                doFnDeep(2, argsToArray, getOrNull('[0]'), getOrNull('[1][1]'))
              )
            ),
            getOrArray('[0]'),
            flow(getOrArray('[1][1]'), arrayShift)
          )
        ),
        getOrNull('[0].length'),
        flow(
          getOrNull('[0].length'),
          connectFn(nMathDivBy, prevResult, 3),
          mathCeil
        ),
        getOrArray('[0]')
      )
    ),
    objectCreate
  ),
  cFlatten(1),
  Object.fromEntries
)
