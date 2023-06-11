import flow from 'lodash/flow'
import set from 'lodash/set'
import {
  constant,
  lift,
  morphism,
  objectCreate,
  prevResult,
  silentMap,
  toPool,
  ucget,
} from '~/utils/fp'

export const canvasCreateSize = flow(
  morphism(lift, toPool, prevResult, objectCreate),
  silentMap(lift, set, ucget('[1]'), constant('w'), ucget('[0].clientWidth')),
  silentMap(lift, set, ucget('[1]'), constant('h'), ucget('[0].clientHeight')),
  ucget('[1]')
)
