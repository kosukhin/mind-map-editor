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
  getOrNull,
  dc,
  d,
} from '~/utils/fp'

export const calculateMaximums = flow(
  argsToArray,
  dc(
    mathSub,
    getOrNull('[2]'),
    dc(getOrNull, prevResult, flow(getOrNull('[1]'), sconcat('[0].')))
  )
)

export const canvasRestrictBoundaries = curry(
  flow(
    argsToArray,
    dc(
      toPool,
      ucget('[0]'),
      dc(
        calculateMaximums,
        ucget('[1]'),
        constant('w'),
        constant(CANVAS_WIDTH)
      ),
      dc(
        calculateMaximums,
        ucget('[1]'),
        constant('h'),
        constant(CANVAS_HEIGHT)
      )
    ),
    d(
      ifEls,
      prevResult,
      dc(
        and,
        dc(gt, getOrNull('[1]'), constant(0)),
        dc(gt, getOrNull('[2]'), constant(0))
      ),
      dc(
        toPool,
        dc(
          toPool,
          constant('x'),
          d(
            ifEls,
            prevResult,
            dc(gt, getOrNull('[0].x'), constant(0)),
            constant(0),
            d(
              ifEls,
              prevResult,
              dc(
                gt,
                dc(mathMultiply, getOrNull('[0].x'), constant(-1)),
                getOrNull('[1]')
              ),
              dc(mathMultiply, getOrNull('[1]'), constant(-1)),
              getOrNull('[0].x')
            )
          )
        ),
        dc(
          toPool,
          constant('y'),
          d(
            ifEls,
            prevResult,
            dc(gt, getOrNull('[0].y'), constant(0)),
            constant(0),
            d(
              ifEls,
              prevResult,
              dc(
                gt,
                dc(mathMultiply, getOrNull('[0].y'), constant(-1)),
                getOrNull('[2]')
              ),
              dc(mathMultiply, getOrNull('[2]'), constant(-1)),
              getOrNull('[0].y')
            )
          )
        )
      )
    ),
    Object.fromEntries
  ),
  2
)
