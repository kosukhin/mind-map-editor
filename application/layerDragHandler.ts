import flow from 'lodash/flow'
import {
  constant,
  f,
  getOrNull,
  getOrObject,
  objectFromArray,
  pass,
  sconcat,
  toPool,
} from '~/utils/fp'

export const layerDragHandler = flow(
  f.do(objectFromArray, pass, ['vDrag', '[0]'], ['vMap', '[1]']),
  f.doCtx(
    toPool,
    f.doCtx(
      getOrObject,
      pass,
      f.doCtx(
        sconcat,
        constant('vMap.objects.'),
        getOrNull('vDrag.target.attrs.objectId')
      )
    ),
    flow(
      f.doCtx(
        toPool,
        f.doCtx(toPool, constant('x'), getOrNull('vDrag.target.attrs.x')),
        f.doCtx(toPool, constant('y'), getOrNull('vDrag.target.attrs.y'))
      ),
      Object.fromEntries
    )
  )
)
