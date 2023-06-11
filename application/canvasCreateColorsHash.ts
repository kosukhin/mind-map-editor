import flow from 'lodash/flow'
import { colorsMap } from '~/constants'
import {
  arrayShift,
  cand,
  cFlatten,
  clone,
  inject,
  lift,
  morphism,
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
  morphismDeep,
  args,
} from '~/utils/fp'

export const canvasCreateColorsHash = flow(
  morphism(
    nIfElse,
    morphism(lift, cand, ucget('settings'), ucget('settings.colored')),
    flow(
      ucget('objects'),
      objectValues,
      morphism(nArrayMap, ucget('lastClick')),
      morphism(nArraySort, sortAsc),
      morphism(lift, toPool, prevResult, inject(clone(colorsMap))),
      morphism(
        lift,
        nIterateGroup,
        morphismDeep(
          2,
          lift,
          pass,
          morphism(
            lift,
            flow(
              args,
              morphism(
                lift,
                nArrayMap,
                ucget('[0]'),
                morphismDeep(2, lift, toPool, ucget('[0]'), ucget('[1][1]'))
              )
            ),
            ucget('[0]'),
            flow(ucget('[1][1]'), arrayShift)
          )
        ),
        ucget('[0].length'),
        flow(ucget('[0].length'), morphism(nMathDivBy, 3), mathCeil),
        ucget('[0]')
      )
    ),
    objectCreate
  ),
  cFlatten(1),
  Object.fromEntries
)
