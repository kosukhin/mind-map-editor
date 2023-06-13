import flow from 'lodash/flow'
import { argsToArray, constant, f, getOrNull } from '~/utils/fp'

export const canvasCreateSize = flow(
  f.doCtx(
    argsToArray,
    f.doCtx(argsToArray, constant('w'), getOrNull('clientWidth')),
    f.doCtx(argsToArray, constant('h'), getOrNull('clientHeight'))
  ),
  Object.fromEntries
)
