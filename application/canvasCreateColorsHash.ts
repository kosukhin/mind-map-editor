import flow from 'lodash/flow'
import { colorsMap } from '~/constants'
import {
  arrayShift,
  cand,
  cFlatten,
  clone,
  inject,
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
  args,
  connectFn,
  doFn,
  doFnDeep,
} from '~/utils/fp'

export const canvasCreateColorsHash = flow(
  connectFn(
    nIfElse,
    prevResult,
    doFn(cand, ucget('settings'), ucget('settings.colored')),
    flow(
      ucget('objects'),
      objectValues,
      connectFn(nArrayMap, prevResult, ucget('lastClick')),
      connectFn(nArraySort, prevResult, sortAsc),
      doFn(toPool, prevResult, inject(clone(colorsMap))),
      doFn(
        nIterateGroup,
        doFnDeep(
          2,
          pass,
          doFn(
            flow(
              args,
              doFn(
                nArrayMap,
                ucget('[0]'),
                doFnDeep(2, toPool, ucget('[0]'), ucget('[1][1]'))
              )
            ),
            ucget('[0]'),
            flow(ucget('[1][1]'), arrayShift)
          )
        ),
        ucget('[0].length'),
        flow(
          ucget('[0].length'),
          connectFn(nMathDivBy, prevResult, 3),
          mathCeil
        ),
        ucget('[0]')
      )
    ),
    objectCreate
  ),
  cFlatten(1),
  Object.fromEntries
)
