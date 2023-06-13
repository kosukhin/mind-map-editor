import flow from 'lodash/flow'
import curry from 'lodash/curry'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '~/constants'
import {
  constant,
  gt,
  mathMultiply,
  mathSub,
  ucget,
  sconcat,
  prevResult,
  toPool,
  ifEls,
  and,
  argsToArray,
  f,
  getOrNull,
} from '~/utils/fp'

export const calculateMaximums = flow(
  argsToArray,
  f.doCtx(
    mathSub,
    getOrNull('[2]'),
    f.doCtx(getOrNull, prevResult, flow(getOrNull('[1]'), sconcat('[0].')))
  )
)

export const canvasRestrictBoundaries = curry(
  flow(
    argsToArray,
    f.doCtx(
      toPool,
      ucget('[0]'),
      f.doCtx(
        calculateMaximums,
        ucget('[1]'),
        constant('w'),
        constant(CANVAS_WIDTH)
      ),
      f.doCtx(
        calculateMaximums,
        ucget('[1]'),
        constant('h'),
        constant(CANVAS_HEIGHT)
      )
    ),
    f.do(
      ifEls,
      prevResult,
      f.doCtx(
        and,
        f.doCtx(gt, ucget('[1]'), constant(0)),
        f.doCtx(gt, ucget('[2]'), constant(0))
      ),
      f.doCtx(
        toPool,
        f.doCtx(
          toPool,
          constant('x'),
          f.do(
            ifEls,
            prevResult,
            f.doCtx(gt, ucget('[0].x'), constant(0)),
            constant(0),
            f.do(
              ifEls,
              prevResult,
              f.doCtx(
                gt,
                f.doCtx(mathMultiply, ucget('[0].x'), constant(-1)),
                ucget('[1]')
              ),
              f.doCtx(mathMultiply, ucget('[1]'), constant(-1)),
              ucget('[0].x')
            )
          )
        ),
        f.doCtx(
          toPool,
          constant('y'),
          f.do(
            ifEls,
            prevResult,
            f.doCtx(gt, ucget('[0].y'), constant(0)),
            constant(0),
            f.do(
              ifEls,
              prevResult,
              f.doCtx(
                gt,
                f.doCtx(mathMultiply, ucget('[0].y'), constant(-1)),
                ucget('[2]')
              ),
              f.doCtx(mathMultiply, ucget('[2]'), constant(-1)),
              ucget('[0].y')
            )
          )
        )
      )
    ),
    Object.fromEntries
  ),
  2
)
