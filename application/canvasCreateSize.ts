import flow from 'lodash/flow'
import { constant, doFn, toPool, ucget } from '~/utils/fp'

export const canvasCreateSize = flow(
  doFn(
    toPool,
    doFn(toPool, constant('w'), ucget('clientWidth')),
    doFn(toPool, constant('h'), ucget('clientHeight'))
  ),
  Object.fromEntries
)
