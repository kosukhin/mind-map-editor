import flow from 'lodash/flow'
import set from 'lodash/set'
import get from 'lodash/get'
import { Size } from '~/entities/CanvasSize'
import { stateStepper } from '~/libraries/stateStepper'
import { pass } from '~/utils/fp'

export const canvasCreateSize = (canvasElement: HTMLElement): Size =>
  stateStepper(
    {
      canvasElement,
      canvasWidth: null,
      canvasHeight: null,
      size: {},
    },
    (step) =>
      flow(
        step(get, ['canvasElement', 'clientWidth'], 'canvasWidth'),
        step(get, ['canvasElement', 'clientHeight'], 'canvasHeight'),
        step(set, ['size', 'w', 'canvasWidth']),
        step(set, ['size', 'h', 'canvasHeight']),
        step(pass, ['size'])
      )
  )
