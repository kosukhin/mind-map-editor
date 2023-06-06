import flow from 'lodash/flow'
import set from 'lodash/set'
import get from 'lodash/get'
import { Step, stepper } from '~/libraries/stepper'
import { objectCreate, pass } from '~/utils/fp'

export const canvasCreateSize = stepper(
  ['canvasElement'],
  ['canvasWidth', 'canvasHeight', 'size'],
  (s: Step) =>
    flow(
      s(get, ['canvasElement', 'clientWidth'], 'canvasWidth'),
      s(get, ['canvasElement', 'clientHeight'], 'canvasHeight'),
      s(objectCreate, 'size'),
      s(set, ['size', 'w', 'canvasWidth']),
      s(set, ['size', 'h', 'canvasHeight']),
      s(pass, ['size'])
    )
)
