import flow from 'lodash/flow'
import set from 'lodash/set'
import get from 'lodash/get'
import curryRight from 'lodash/curryRight'
import { objectCreate, pass } from '~/utils/fp'

const cget = curryRight(get, 3)
const ucget = cget(null)

export const canvasCreateSize = flow(
  applyArgs(toPool, pass, objectCreate),
  skipResult(applyArgs(set, ucget('[1]'), v('w'), ucget('[0].clientWidth'))),
  skipResult(applyArgs(set, ucget('[1]'), v('h'), ucget('[0].clientHeight'))),
  ucget('[1]')
)

function v(v) {
  return () => v
}

function skipResult(fn) {
  return (v) => {
    fn(v)
    return v
  }
}

function applyArgs(fn: Function, ...argsFns: Function[]) {
  return (v) => {
    const realArgs = argsFns.map((argFn) => {
      return argFn(v)
    })
    return fn(...realArgs)
  }
}

function applyAll(...argsFns: Function[]) {
  return (v) => {
    return argsFns.map((argFn) => {
      return argFn(v)
    })
  }
}

function debug(v) {
  console.log('debug:', v)
  return v
}

function toPool(...args: any[]) {
  return [...args]
}
