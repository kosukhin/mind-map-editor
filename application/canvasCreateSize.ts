import flow from 'lodash/flow'
import set from 'lodash/set'
import get from 'lodash/get'
import { createStepper } from '~/libraries/stepper'
import { objectCreate, pass } from '~/utils/fp'

const { entryPoint, step: s } = createStepper(
  ['canvasElement'],
  ['canvasWidth', 'canvasHeight', 'size']
)
export const canvasCreateSize = flow(
  entryPoint,
  s(get, ['canvasElement', 'clientWidth'], 'canvasWidth'),
  s(get, ['canvasElement', 'clientHeight'], 'canvasHeight'),
  s(objectCreate, 'size'),
  s(set, ['size', 'w', 'canvasWidth']),
  s(set, ['size', 'h', 'canvasHeight']),
  s(pass, ['size'])
)
