import flow from 'lodash/flow'
import curry from 'lodash/curry'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '~/constants'
import {
  args,
  constant,
  gt,
  mathMultiply,
  mathSub,
  morphism,
  ucget,
  sconcat,
  prevResult,
  mlift,
  toPool,
  nIfElse,
  cand,
} from '~/utils/fp'

export const calculateMaximums = flow(
  args,
  mlift(
    mathSub,
    ucget('[2]'),
    mlift(ucget, prevResult, flow(ucget('[1]'), sconcat('[0].')))
  )
)

export const canvasRestrictBoundaries = curry(
  flow(
    args,
    mlift(
      toPool,
      ucget('[0]'),
      mlift(
        calculateMaximums,
        ucget('[1]'),
        constant('w'),
        constant(CANVAS_WIDTH)
      ),
      mlift(
        calculateMaximums,
        ucget('[1]'),
        constant('h'),
        constant(CANVAS_HEIGHT)
      )
    ),
    morphism(
      nIfElse,
      mlift(
        cand,
        mlift(gt, ucget('[1]'), constant(0)),
        mlift(gt, ucget('[2]'), constant(0))
      ),
      flow(
        mlift(
          toPool,
          mlift(
            toPool,
            constant('x'),
            morphism(
              nIfElse,
              mlift(gt, ucget('[0].x'), constant(0)),
              constant(0),
              morphism(
                nIfElse,
                mlift(
                  gt,
                  mlift(mathMultiply, ucget('[0].x'), constant(-1)),
                  ucget('[1]')
                ),
                mlift(mathMultiply, ucget('[1]'), constant(-1)),
                ucget('[0].x')
              )
            )
          ),
          mlift(
            toPool,
            constant('y'),
            morphism(
              nIfElse,
              mlift(gt, ucget('[0].y'), constant(0)),
              constant(0),
              morphism(
                nIfElse,
                mlift(
                  gt,
                  mlift(mathMultiply, ucget('[0].y'), constant(-1)),
                  ucget('[2]')
                ),
                mlift(mathMultiply, ucget('[2]'), constant(-1)),
                ucget('[0].y')
              )
            )
          )
        )
      )
    ),
    Object.fromEntries
  ),
  2
)
