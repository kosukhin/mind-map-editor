import flow from 'lodash/flow'
import get from 'lodash/get'
import set from 'lodash/set'
import { createStepper } from '~/libraries/stepper'
import { colorsMap } from '~/constants'
import {
  arrayForEach,
  arrayMap,
  arrayShift,
  arraySort,
  clone,
  ifElse,
  inject,
  iterateGroup,
  mathCeil,
  mathDivBy,
  objectCreate,
  objectValues,
  pass,
  sortAsc,
} from '~/utils/fp'
import { isTruthy } from '~/utils/comparators'

const { entryPoint, step: s } = createStepper(
  ['vMap'],
  ['clicks', 'clicksLength', 'chunkSize', 'groups', 'colorsMap']
)
export const canvasCreateColorsHash = flow(
  entryPoint,
  s(objectCreate, 'groups'),
  s(inject(clone(colorsMap)), 'colorsMap'),
  s(get, ['vMap', 'settings.colored']),
  ifElse(
    isTruthy,
    flow(
      objectCreate,
      s(get, ['vMap', 'objects', 'prevResult']),
      objectValues,
      arrayMap(s(get, ['prevResult', 'lastClick'])),
      s(arraySort(sortAsc), ['prevResult'], 'clicks'),
      s(get, ['clicks', 'length', 0], 'clicksLength'),
      s(mathDivBy(3), ['clicksLength']),
      mathCeil,
      s(pass, ['prevResult'], 'chunkSize'),
      s(iterateGroup, [
        flow(
          s(pass, ['prevResult'], 'currentGroup'),
          s(arrayShift, ['colorsMap'], 'currentColor'),
          s(arrayForEach(s(set, ['groups', 'prevResult', 'currentColor'])), [
            'currentGroup',
          ])
        ),
        'clicksLength',
        'chunkSize',
        'clicks',
      ])
    )
  ),
  s(pass, ['groups'])
)
