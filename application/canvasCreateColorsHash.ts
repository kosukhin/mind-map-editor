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
  d,
  dc,
  dcd,
} from '~/utils/fp'

export const canvasCreateColorsHash = flow(
  d(
    ifEls,
    prevResult,
    dc(and, getOrFalse('settings'), getOrFalse('settings.colored')),
    flow(
      getOrObject('objects'),
      objectValues,
      d(arrayMap, prevResult, getOrNull('lastClick')),
      d(arraySort, prevResult, sortAsc),
      dc(argsToArray, prevResult, inject(clone(colorsMap))),
      dc(
        iterateGroup,
        dcd(
          2,
          pass,
          dc(
            flow(
              argsToArray,
              dc(
                arrayMap,
                getOrArray('[0]'),
                dcd(2, argsToArray, getOrNull('[0]'), getOrNull('[1][1]'))
              )
            ),
            getOrArray('[0]'),
            flow(getOrArray('[1][1]'), arrayShift)
          )
        ),
        getOrNull('[0].length'),
        flow(getOrNull('[0].length'), d(nMathDivBy, prevResult, 3), mathCeil),
        getOrArray('[0]')
      )
    ),
    objectCreate
  ),
  flatten(1),
  Object.fromEntries
)
