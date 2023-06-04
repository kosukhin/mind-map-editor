import flow from 'lodash/flow'
import set from 'lodash/set'
import get from 'lodash/get'
import { stateStepper } from '~/libraries/stateStepper'
import { pass } from '~/utils/fp'

export const canvasCreateSize = stateStepper(
  ['canvasElement'],
  ['canvasWidth', 'canvasHeight', 'size'],
  (step) =>
    flow(
      step(get, ['canvasElement', 'clientWidth'], 'canvasWidth'),
      step(get, ['canvasElement', 'clientHeight'], 'canvasHeight'),
      step(pass, [{}], 'size'),
      step(set, ['size', 'w', 'canvasWidth']),
      step(set, ['size', 'h', 'canvasHeight']),
      step(pass, ['size'])
    )
)
