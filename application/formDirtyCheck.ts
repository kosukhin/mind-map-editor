import flow from 'lodash/flow'
import curry from 'lodash/curry'
import {
  argsToObject,
  constant,
  d,
  dc,
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
    d(
      ifEls,
      pass,
      dc(neq, getOrNull('formName'), getOrNull('overlayName')),
      constant(null),
      getOrFalse('isDirty')
    )
  ),
  3
)
