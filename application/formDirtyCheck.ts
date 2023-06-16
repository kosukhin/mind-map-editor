import flow from 'lodash/flow'
import curry from 'lodash/curry'
import {
  argsToArray,
  constant,
  f,
  getOrFalse,
  getOrNull,
  ifEls,
  neq,
  pass,
} from '~/utils/fp'

export const formDirtyCheck = curry(
  flow(
    argsToArray,
    f.do(
      ifEls,
      pass,
      f.doCtx(neq, getOrNull('[1]'), getOrNull('[2]')),
      constant(null),
      getOrFalse('[0]')
    )
  ),
  3
)
