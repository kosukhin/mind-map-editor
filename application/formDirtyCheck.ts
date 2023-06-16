import flow from 'lodash/flow'
import curry from 'lodash/curry'
import {
  argsToObject,
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
    argsToObject([
      ['isDirty', '[0]'],
      ['formName', '[1]'],
      ['overlayName', '[2]'],
    ]),
    f.do(
      ifEls,
      pass,
      f.doCtx(neq, getOrNull('formName'), getOrNull('overlayName')),
      constant(null),
      getOrFalse('isDirty')
    )
  ),
  3
)
