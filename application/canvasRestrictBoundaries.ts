import flow from 'lodash/flow'
import set from 'lodash/set'
import get from 'lodash/get'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '~/constants'
import { stateStepper } from '~/libraries/stateStepper'
import { and, gt, ifElse, mathMultiply, mathSub, pass } from '~/utils/fp'

export const canvasRestrictBoundaries = stateStepper(
  ['pos', 'canvasSize'],
  {
    maxRight: null,
    nMaxRight: null,
    maxBottom: null,
    nMaxBottom: null,
    posX: null,
    posY: null,
    right: null,
    bottom: null,
    size: { x: 0, y: 0 },
  },
  (step) =>
    flow(
      step(get, ['canvasSize', 'w']),
      step(mathSub, [CANVAS_WIDTH, 'prevResult'], 'maxRight'),
      step(mathMultiply, ['maxRight', -1], 'nMaxRight'),
      step(get, ['canvasSize', 'h']),
      step(mathSub, [CANVAS_HEIGHT, 'prevResult'], 'maxBottom'),
      step(mathMultiply, ['maxBottom', -1], 'nMaxBottom'),
      step(get, ['pos', 'x'], 'posX'),
      step(get, ['pos', 'y'], 'posY'),
      step(mathMultiply, ['posX', -1], 'right'),
      step(mathMultiply, ['posY', -1], 'bottom'),
      and(step(gt, ['maxBottom', 0]), step(gt, ['maxRight', 0])),
      ifElse(
        step(pass, ['prevResult']),
        flow(
          step(pass, ['pos'], 'size'),
          ifElse(
            step(gt, ['posX', 0]),
            step(set, ['size', 'x', 0]),
            ifElse(
              step(gt, ['right', 'maxRight']),
              step(set, ['size', 'x', 'nMaxRight']),
              step(set, ['size', 'x', 'posX'])
            )
          ),
          ifElse(
            step(gt, ['posY', 0]),
            step(set, ['size', 'y', 0]),
            ifElse(
              step(gt, ['bottom', 'maxBottom']),
              step(set, ['size', 'y', 'nMaxBottom']),
              step(set, ['size', 'y', 'posY'])
            )
          )
        )
      ),
      step(pass, ['size'])
    )
)
