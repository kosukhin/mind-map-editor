import flow from 'lodash/flow'
import set from 'lodash/set'
import get from 'lodash/get'
import { stepper } from '~/libraries/stepper'
import { pass } from '~/utils/fp'

export const canvasCreateSize = stepper(
  ['canvasElement'],
  ['canvasWidth', 'canvasHeight', 'size'],
  (s) =>
    flow(
      s(get, ['canvasElement', 'clientWidth'], 'canvasWidth'),
      s(get, ['canvasElement', 'clientHeight'], 'canvasHeight'),
      s(pass, [{}], 'size'),
      s(set, ['size', 'w', 'canvasWidth']),
      s(set, ['size', 'h', 'canvasHeight']),
      s(pass, ['size'])
    )
)
