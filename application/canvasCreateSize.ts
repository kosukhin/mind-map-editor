import flow from 'lodash/flow'
import { argsToArray, constant, doFn, ucget } from '~/utils/fp'

export const canvasCreateSize = flow(
  doFn(
    argsToArray,
    doFn(argsToArray, constant('w'), ucget('clientWidth')),
    doFn(argsToArray, constant('h'), ucget('clientHeight'))
  ),
  Object.fromEntries
)
