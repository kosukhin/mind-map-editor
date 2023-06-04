import flow from 'lodash/flow'
import get from 'lodash/get'
import set from 'lodash/set'
import { stateStepper } from '~/libraries/stateStepper'
import { colorsMap } from '~/constants'
import {
  arrayForEach,
  arrayMap,
  arrayShift,
  arraySort,
  clone,
  ifElse,
  iterateGroup,
  mathCeil,
  mathDivBy,
  objectValues,
  pass,
  sortAsc,
} from '~/utils/fp'
import { isTruthy } from '~/utils/comparators'

export const canvasCreateColorsHash = stateStepper(
  ['vMap'],
  ['clicks', 'clicksLength', 'chunkSize', 'groups', 'colorsMap'],
  (step) =>
    flow(
      step(clone, [{}], 'groups'),
      step(clone, [colorsMap], 'colorsMap'),
      step(get, ['vMap', 'settings.colored']),
      ifElse(
        isTruthy,
        flow(
          step(get, ['vMap', 'objects', {}]),
          objectValues,
          arrayMap(step(get, ['prevResult', 'lastClick'])),
          arraySort(sortAsc),
          step(pass, ['prevResult'], 'clicks'),
          step(get, ['clicks', 'length', 0]),
          step(pass, ['prevResult'], 'clicksLength'),
          step(mathDivBy(3), ['clicksLength']),
          mathCeil,
          step(pass, ['prevResult'], 'chunkSize'),
          step(iterateGroup, [
            flow(
              step(pass, ['prevResult'], 'currentGroup'),
              step(arrayShift, ['colorsMap'], 'currentColor'),
              step(
                arrayForEach(
                  step(set, ['groups', 'prevResult', 'currentColor'])
                ),
                ['currentGroup']
              )
            ),
            'clicksLength',
            'chunkSize',
            'clicks',
          ])
        )
      ),
      step(pass, ['groups'])
    )
)
