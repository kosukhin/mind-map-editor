import flow from 'lodash/flow'
import curry from 'lodash/curry'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '~/constants'
import {
  args,
  constant,
  gt,
  mathMultiply,
  mathSub,
  ucget,
  sconcat,
  prevResult,
  doFn,
  toPool,
  nIfElse,
  cand,
  connectFn,
} from '~/utils/fp'

export const calculateMaximums = flow(
  args,
  doFn(
    mathSub,
    ucget('[2]'),
    doFn(ucget, prevResult, flow(ucget('[1]'), sconcat('[0].')))
  )
)

export const canvasRestrictBoundaries = curry(
  flow(
    args,
    doFn(
      toPool,
      ucget('[0]'),
      doFn(
        calculateMaximums,
        ucget('[1]'),
        constant('w'),
        constant(CANVAS_WIDTH)
      ),
      doFn(
        calculateMaximums,
        ucget('[1]'),
        constant('h'),
        constant(CANVAS_HEIGHT)
      )
    ),
    connectFn(
      nIfElse,
      doFn(
        cand,
        doFn(gt, ucget('[1]'), constant(0)),
        doFn(gt, ucget('[2]'), constant(0))
      ),
      doFn(
        toPool,
        doFn(
          toPool,
          constant('x'),
          connectFn(
            nIfElse,
            doFn(gt, ucget('[0].x'), constant(0)),
            constant(0),
            connectFn(
              nIfElse,
              doFn(
                gt,
                doFn(mathMultiply, ucget('[0].x'), constant(-1)),
                ucget('[1]')
              ),
              doFn(mathMultiply, ucget('[1]'), constant(-1)),
              ucget('[0].x')
            )
          )
        ),
        doFn(
          toPool,
          constant('y'),
          connectFn(
            nIfElse,
            doFn(gt, ucget('[0].y'), constant(0)),
            constant(0),
            connectFn(
              nIfElse,
              doFn(
                gt,
                doFn(mathMultiply, ucget('[0].y'), constant(-1)),
                ucget('[2]')
              ),
              doFn(mathMultiply, ucget('[2]'), constant(-1)),
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
