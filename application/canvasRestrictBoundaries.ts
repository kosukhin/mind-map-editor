import flow from 'lodash/flow'
import set from 'lodash/set'
import get from 'lodash/get'
import curry from 'lodash/curry'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '~/constants'
import { stepper } from '~/libraries/stepper'
import { and, gt, ifElse, mathMultiply, mathSub, pass } from '~/utils/fp'

const {
  entryPoint,
  step: s,
  argsCount,
} = stepper(
  ['pos', 'canvasSize'],
  [
    'maxRight',
    'nMaxRight',
    'maxBottom',
    'nMaxBottom',
    'posX',
    'posY',
    'right',
    'bottom',
    'size',
  ]
)
export const canvasRestrictBoundaries = curry(
  flow(
    entryPoint,
    s(get, ['canvasSize', 'w']),
    s(mathSub, [CANVAS_WIDTH, 'prevResult'], 'maxRight'),
    s(mathMultiply, ['maxRight', -1], 'nMaxRight'),
    s(get, ['canvasSize', 'h']),
    s(mathSub, [CANVAS_HEIGHT, 'prevResult'], 'maxBottom'),
    s(mathMultiply, ['maxBottom', -1], 'nMaxBottom'),
    s(get, ['pos', 'x'], 'posX'),
    s(get, ['pos', 'y'], 'posY'),
    s(mathMultiply, ['posX', -1], 'right'),
    s(mathMultiply, ['posY', -1], 'bottom'),
    s(pass, ['pos'], 'size'),
    s(set, ['size', 'x', 0]),
    s(set, ['size', 'y', 0]),
    and(s(gt, ['maxBottom', 0]), s(gt, ['maxRight', 0])),
    ifElse(
      s(pass, ['prevResult']),
      flow(
        s(pass, ['pos'], 'size'),
        ifElse(
          s(gt, ['posX', 0]),
          s(set, ['size', 'x', 0]),
          ifElse(
            s(gt, ['right', 'maxRight']),
            s(set, ['size', 'x', 'nMaxRight']),
            s(set, ['size', 'x', 'posX'])
          )
        ),
        ifElse(
          s(gt, ['posY', 0]),
          s(set, ['size', 'y', 0]),
          ifElse(
            s(gt, ['bottom', 'maxBottom']),
            s(set, ['size', 'y', 'nMaxBottom']),
            s(set, ['size', 'y', 'posY'])
          )
        )
      )
    ),
    s(pass, ['size'])
  ),
  argsCount
)
