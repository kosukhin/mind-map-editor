import flow from 'lodash/flow'
import get from 'lodash/get'
import set from 'lodash/set'
import { stepper, step, stepperResult, clearStep } from '~/libraries/stepper/v2'
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

export const canvasCreateColorsHash = flow(
  stepper(
    ['vMap'],
    ['clicks', 'clicksLength', 'chunkSize', 'groups', 'colorsMap', '__debug']
  ),
  step(objectCreate, 'groups'),
  step(inject(clone(colorsMap)), 'colorsMap'),
  step(get, ['vMap', 'settings.colored']),
  ifElse(
    flow(step(isTruthy, ['prevResult']), stepperResult()),
    flow(
      step(objectCreate),
      step(get, ['vMap', 'objects', 'prevResult']),
      step(objectValues),
      step(arrayMap(clearStep(get, ['prevResult', 'lastClick'])), [
        'prevResult',
      ]),
      step(arraySort(sortAsc), ['prevResult'], 'clicks'),
      step(get, ['clicks', 'length', 0], 'clicksLength'),
      step(mathDivBy(3), ['clicksLength']),
      step(mathCeil),
      step(pass, ['prevResult'], 'chunkSize'),
      step(iterateGroup, [
        flow(
          step(pass, ['prevResult'], 'currentGroup'),
          step(arrayShift, ['colorsMap'], 'currentColor'),
          step(
            arrayForEach(
              clearStep(set, ['groups', 'prevResult', 'currentColor'])
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
  stepperResult('groups')
)
