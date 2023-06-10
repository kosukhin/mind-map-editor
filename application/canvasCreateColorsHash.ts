import flow from 'lodash/flow'
import get from 'lodash/get'
import set from 'lodash/set'
import { aliases } from '~/libraries/stepper/v2'
import { colorsMap } from '~/constants'
import {
  arrayForEach,
  arrayMap,
  arrayShift,
  arraySort,
  clone,
  debug,
  ifElse,
  inject,
  iterateGroup,
  lift,
  map,
  mathCeil,
  mathDivBy,
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
  ucget,
} from '~/utils/fp'
import { isTruthy } from '~/utils/comparators'

const { $, $s, $r, $c } = aliases

export const canvasCreateColorsHash2 = flow(
  map(
    nIfElse,
    ucget('settings.colored'),
    flow(
      ucget('objects'),
      objectValues,
      map(nArrayMap, ucget('lastClick')),
      map(nArraySort, sortAsc),
      map(
        lift,
        nIterateGroup,
        debug,
        ucget('length'),
        flow(ucget('length'), map(nMathDivBy, 3), mathCeil),
        prevResult
      )
    ),
    objectCreate
  ),
  debug
)

export const canvasCreateColorsHash = flow(
  $s(['vMap'], ['clicks', 'clicksLength', 'chunkSize', 'groups', 'colorsMap']),
  $(objectCreate, 'groups'),
  $(inject(clone(colorsMap)), 'colorsMap'),
  $(get, ['vMap', 'settings.colored']),
  ifElse(
    flow($(isTruthy, ['prevResult']), $r()),
    flow(
      $(objectCreate),
      $(get, ['vMap', 'objects', 'prevResult']),
      $(objectValues),
      $(arrayMap($c(get, ['prevResult', 'lastClick'])), ['prevResult']),
      $(arraySort(sortAsc), ['prevResult'], 'clicks'),
      $(get, ['clicks', 'length', 0], 'clicksLength'),
      $(mathDivBy(3), ['clicksLength']),
      $(mathCeil, 'chunkSize'),
      iterateGroup(
        flow(
          $(pass, ['prevResult'], 'currentGroup'),
          $(arrayShift, ['colorsMap'], 'currentColor'),
          arrayForEach(
            $(set, ['groups', 'prevResult', 'currentColor']),
            $r('currentGroup')
          )
        ),
        $r('clicksLength'),
        $r('chunkSize'),
        $r('clicks')
      )
    )
  ),
  $r('groups')
)
