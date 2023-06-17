import flow from 'lodash/flow'
import {
  call,
  constant,
  d,
  dc,
  getOrNull,
  mathSub,
  objectFromArray,
  pass,
  silentMap,
  toPool,
} from '~/utils/fp'

export const layerWheelHandler = flow(
  d(objectFromArray, pass, ['vStage', '[0]'], ['e', '[1]']),
  silentMap(dc(call, getOrNull('e.evt.preventDefault'), getOrNull('e.evt'))),
  dc(
    toPool,
    getOrNull('vStage'),
    flow(
      dc(
        toPool,
        dc(
          toPool,
          constant('x'),
          dc(
            mathSub,
            dc(call, getOrNull('vStage.x'), getOrNull('vStage')),
            getOrNull('e.evt.deltaX')
          )
        ),
        dc(
          toPool,
          constant('y'),
          dc(
            mathSub,
            dc(call, getOrNull('vStage.y'), getOrNull('vStage')),
            getOrNull('e.evt.deltaY')
          )
        )
      ),
      Object.fromEntries
    )
  )
)
