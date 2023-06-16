import flow from 'lodash/flow'
import { argsToArray, constant, dc, getOrNull } from '~/utils/fp'

export const canvasCreateSize = flow(
  dc(
    argsToArray,
    dc(argsToArray, constant('w'), getOrNull('clientWidth')),
    dc(argsToArray, constant('h'), getOrNull('clientHeight'))
  ),
  Object.fromEntries
)
