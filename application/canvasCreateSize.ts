import flow from 'lodash/flow'
import set from 'lodash/set'
import get from 'lodash/get'
import curryRight from 'lodash/curryRight'
import { objectCreate } from '~/utils/fp'

const cget = curryRight(get, 3)
const ucget = cget(null)

export const canvasCreateSize = flow(
  map(lift, toPool, prevResult, objectCreate),
  silentMap(lift, set, ucget('[1]'), constant('w'), ucget('[0].clientWidth')),
  silentMap(lift, set, ucget('[1]'), constant('h'), ucget('[0].clientHeight')),
  ucget('[1]')
)

function constant(v) {
  return () => v
}

function prevResult(v) {
  return v
}

function map(fn, ...args) {
  return (v) => fn(v, ...args)
}

function silentMap(fn, ...args) {
  return (v) => {
    fn(v, ...args)
    return v
  }
}

function lift(v, fn, ...argFns) {
  return fn(
    ...argFns.map((argFn) => {
      return argFn(v)
    })
  )
}

function toPool(...args: any[]) {
  if (Array.isArray(args[0])) {
    const [first, ...rest] = args
    return [].concat(first, rest)
  }
  return [...args]
}
