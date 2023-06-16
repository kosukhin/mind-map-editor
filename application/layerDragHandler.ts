import flow from 'lodash/flow'
import {
  constant,
  d,
  dc,
  getOrNull,
  getOrObject,
  objectFromArray,
  pass,
  sconcat,
  toPool,
} from '~/utils/fp'

export const layerDragHandler = flow(
  d(objectFromArray, pass, ['vDrag', '[0]'], ['vMap', '[1]']),
  dc(
    toPool,
    dc(
      getOrObject,
      pass,
      dc(
        sconcat,
        constant('vMap.objects.'),
        getOrNull('vDrag.target.attrs.objectId')
      )
    ),
    flow(
      dc(
        toPool,
        dc(toPool, constant('x'), getOrNull('vDrag.target.attrs.x')),
        dc(toPool, constant('y'), getOrNull('vDrag.target.attrs.y'))
      ),
      Object.fromEntries
    )
  )
)
