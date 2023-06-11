import flow from 'lodash/flow'
import { colorsMap } from '~/constants'
import {
  arrayShift,
  cand,
  cFlatten,
  chain,
  clone,
  inject,
  lift,
  map,
  mathCeil,
  nArrayMap,
  nArraySort,
  nIfElse,
  nIterateGroup,
  nMathDivBy,
  objectCreate,
  objectValues,
  pass,
  prevResult,
  sortAsc,
  toPool,
  ucget,
} from '~/utils/fp'

export const canvasCreateColorsHash = flow(
  map(
    nIfElse,
    map(lift, cand, ucget('settings'), ucget('settings.colored')),
    flow(
      ucget('objects'),
      objectValues,
      map(nArrayMap, ucget('lastClick')),
      map(nArraySort, sortAsc),
      map(lift, toPool, prevResult, inject(clone(colorsMap))),
      map(
        lift,
        nIterateGroup,
        chain(
          map(
            lift,
            pass,
            map(
              lift,
              fillArray,
              ucget('[0]'),
              flow(ucget('[1][1]'), arrayShift)
            )
          )
        ),
        ucget('[0].length'),
        flow(ucget('[0].length'), map(nMathDivBy, 3), mathCeil),
        ucget('[0]')
      )
    ),
    objectCreate
  ),
  cFlatten(1),
  Object.fromEntries
)

function fillArray(arr, value) {
  return arr.map((item) => [item, value])
}
