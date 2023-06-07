import flow from 'lodash/flow'
import set from 'lodash/set'
import get from 'lodash/get'
import { aliases } from '~/libraries/stepper/v2'
import { objectCreate } from '~/utils/fp'

const { $, $s, $r } = aliases

export const canvasCreateSize = flow(
  $s(['canvasElement'], ['canvasWidth', 'canvasHeight', 'size']),
  $(get, ['canvasElement', 'clientWidth'], 'canvasWidth'),
  $(get, ['canvasElement', 'clientHeight'], 'canvasHeight'),
  $(objectCreate, 'size'),
  $(set, ['size', 'w', 'canvasWidth']),
  $(set, ['size', 'h', 'canvasHeight']),
  $r('size')
)
