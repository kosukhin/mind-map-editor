import curryRight from 'lodash/curryRight'
import get from 'lodash/get'
import curry from 'lodash/curry'
import flattenDepth from 'lodash/flattenDepth'
import { aliases, StepContainer } from '~/libraries/stepper/v2'

const { $prev } = aliases

export function nIfElse(v, comparator, thenBranch, elseBranch?) {
  if (comparator(v)) {
    return thenBranch(v)
  } else if (elseBranch) {
    return elseBranch(v)
  }

  return v
}
export function ifElse<T>(
  comparator: (T) => boolean,
  thenBranch: Function,
  elseBranch?: Function
) {
  return (v: T) => {
    if (comparator(v)) {
      return thenBranch(v)
    } else if (elseBranch) {
      return elseBranch(v)
    }

    return v
  }
}

export const cFlatten = curryRight(flattenDepth)
export const clone = (v: any) => JSON.parse(JSON.stringify(v))
export const inject = (obj: any) => () => obj
export const objectValues = Object.values
export const objectCreate = () => ({})
export const arrayMap = (fn: Function) => (v: any[]) => v.map(fn)
export const nArrayMap = (v, fn) => {
  return v.map((v) => fn(v))
}
export const arraySort = (fn: Function) => (v: any[]) => v.sort(fn)
export const nArraySort = (v: any[], fn) => v.sort(fn)
export const arrayShift = (v: any[]) => v.shift()
export const arrayPush = (v: any[], val: any) => v.push(val)
export const sortAsc = (a, b) => a - b
export const mathCeil = Math.ceil
export const mathSub = (a, b) => a - b
export const mathMultiply = (a, b) => a * b
export const mathDivBy = (by: number) => (v) => v / by
export const nMathDivBy = (v, by: number) => v / by
export const pass = (v) => v
export const arrayReduce = (v: any[], fn, initialValue) => {
  return v.reduce(fn, initialValue)
}
export const arrayForEach = (fn: Function, data: any) => {
  return (v: StepContainer) => {
    const vData = data(v)
    vData.forEach((item, index) => {
      v.set($prev, item)
      v.set('$index', index)
      fn(v)
    })
  }
}

export const nIterateGroup = (
  fn: Function,
  limit: any,
  chunk: any,
  data: any
) => {
  const result = []

  for (let i = 0; i < limit; i += chunk) {
    const slice = data.slice(i, i + chunk)
    result.push(fn(slice))
  }

  return result
}

export const iterateGroup = (
  fn: Function,
  limit: any,
  chunk: any,
  data: any
) => {
  return (v: StepContainer) => {
    const vLimit = limit(v)
    const vChunk = chunk(v)
    const vData = data(v)

    for (let i = 0; i < vLimit; i += vChunk) {
      const slice = vData.slice(i, i + vChunk)
      v.set('prevResult', slice)
      fn(v)
    }

    return v
  }
}
export const cand = (a, b) => a && b
export const and = (a, b) => (v) => {
  v.set('prevResult', a(v) && b(v))
  return v
}
export const or = (a, b) => a || b
export const gt = (a, b) => a > b
export const lt = (a, b) => a < b
export const gte = (a, b) => a >= b
export const lte = (a, b) => a <= b
export const eq = (a, b) => a === b

export const fromJson = (json: string) => JSON.parse(json)

export function constant(v) {
  return () => v
}

export function prevResult(v) {
  return v
}

export function morphism(fn, ...args) {
  return (v) => fn(v, ...args)
}

export function chain(fn, ...args) {
  return (v) => (e) => fn([e, v], ...args)
}

export function morphismDeep(deep, fn, ...args) {
  return curryRight((...vargs) => fn(vargs, ...args), deep)
}

export function args(...args) {
  return args
}

export function wrap(fn) {
  return () => fn
}

export function silentMap(fn, ...args) {
  return (v) => {
    fn(v, ...args)
    return v
  }
}

export function lift(v, fn, ...argFns) {
  return fn(
    ...argFns.map((argFn) => {
      return argFn(v)
    })
  )
}

export function toPool(...args: any[]) {
  return [...args]
}

export const cget = curryRight(get, 3)
export const ucget = cget(null)

export const strinify = JSON.stringify
export const parse = JSON.parse

export const log = curry(console.log, 2)
export const debug = silentMap(lift, log('[DEBUG]:'), strinify)
