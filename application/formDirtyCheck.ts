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
  objectFromArray,
  pass,
} from '~/utils/fp'

export const formDirtyCheck = curry(
  flow(
    argsToArray,
    f.do(objectFromArray, pass, [
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
