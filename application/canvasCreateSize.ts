import flow from 'lodash/flow'
import set from 'lodash/set'
import get from 'lodash/get'
import { stepper, step, stepperResult } from '~/libraries/stepper/v2'
import { objectCreate } from '~/utils/fp'

export const canvasCreateSize = flow(
  stepper(['canvasElement'], ['canvasWidth', 'canvasHeight', 'size']),
  step(get, ['canvasElement', 'clientWidth'], 'canvasWidth'),
  step(get, ['canvasElement', 'clientHeight'], 'canvasHeight'),
  step(objectCreate, 'size'),
  step(set, ['size', 'w', 'canvasWidth']),
  step(set, ['size', 'h', 'canvasHeight']),
  stepperResult('size')
)
