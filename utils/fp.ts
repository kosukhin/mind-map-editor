import curryRight from 'lodash/curryRight'
import get from 'lodash/get'
import curry from 'lodash/curry'
import flattenDepth from 'lodash/flattenDepth'
import flow from 'lodash/flow'
import isFunction from 'lodash/isFunction.js'
import { aliases, StepContainer } from '~/libraries/stepper/v2'

const { $prev } = aliases
const isDebug = false

export function ifEls(v, comparator, thenBranch, elseBranch?) {
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

export function objectFromArray(arr: any[], ...args) {
  const result = args.map((item) => {
    return [item[0], getOrNull(arr, item[1])]
  })
  return Object.fromEntries(result)
}
export const flatten = curryRight(flattenDepth)
export const clone = (v: any) => JSON.parse(JSON.stringify(v))
export const inject = (obj: any) => () => obj
export const objectValues = Object.values
export const objectCreate = () => ({})
export const arrayMap = (arr, fn) => {
  return arr.map((v) => fn(v))
}
export const arrayFilter = (arr, fn) => {
  return arr.filter((v) => fn(v))
}
export const arrayForEach = (arr, fn) => {
  return arr.forEach((v, index) => fn([v, index]))
}
export const arraySort = (arr: any[], fn) => arr.sort(fn)
export const arrayShift = (v: any[]) => v.shift()
export const arrayPush = (v: any[], val: any) => v.push(val)
export const sortAsc = (a, b) => a - b
export const mathCeil = Math.ceil
export const mathSub = (a, b) => {
  return a - b
}
export const mathMultiply = (a, b) => a * b
export const mathDivBy = (by: number) => (v) => v / by
export const nMathDivBy = (v, by: number) => v / by
export const pass = (v) => v
export const arrayReduce = (v: any[], fn, initialValue) => {
  return v.reduce(fn, initialValue)
}

export const iterateGroup = (
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

export const and = (a, b) => a && b
export const or = (a, b) => a || b
export const gt = (a, b) => a > b
export const lt = (a, b) => a < b
export const gte = (a, b) => a >= b
export const lte = (a, b) => a <= b
// eslint-disable-next-line eqeqeq
export const eq = (a, b) => a == b
// eslint-disable-next-line eqeqeq
export const neq = (a, b) => a != b

export const fromJson = (json: string) => JSON.parse(json)

export function concat(v, s) {
  return v + s
}
export const sconcat = curry(concat)
export const rconcat = curryRight(concat)

export function constant(v) {
  return () => v
}
export const scalar = constant

export function prevResult(v) {
  return v
}

export function morphism(fn, vModifier: Function, ...args) {
  return (v) => fn(vModifier(v), ...args)
}
export const connectFn = morphism

export function chain(fn, ...args) {
  return (v) => (e) => fn([e, v], ...args)
}

export function morphismDeep(deep, fn, vModifier: Function, ...args) {
  return curryRight((...vargs) => fn(vModifier(vargs), ...args), deep)
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

export function varType(variable) {
  return typeof variable
}

export const call = (fn, context) => (isFunction(fn) ? fn.call(context) : fn)

export function doFn(...args) {
  return morphism(lift, pass, ...args)
}
export function doFnDeep(deep, ...args) {
  return morphismDeep(deep, lift, pass, ...args)
}
export function silentLift(...args) {
  return silentMap(lift, ...args)
}

export function lift(v, fn, ...argFns) {
  const args = argFns.map((argFn) => {
    return argFn(v)
  })
  const result = fn(...args)
  if (isDebug) {
    console.log(
      '[LIFT]',
      'name:',
      fn.name,
      'v:',
      v,
      'args:',
      strinify(args),
      'result:',
      result
    )
  }
  return result
}

export function toPool(...args: any[]) {
  return [...args]
}
export const argsToArray = toPool

export const cget = curryRight(get, 3)
export const ucget = cget(null)
export const getOrFalse = cget(false)
export const getOrNull = cget(null)
export const getOrObject = cget({})
export const getOrArray = cget([])

export const strinify = JSON.stringify
export const parse = JSON.parse

export const log = curry(console.log, 2)
export const debug2 = (enabled, ...args) =>
  enabled
    ? silentMap(lift, console.log, constant('[DEBUG]:'), ...args)
    : silentMap(pass)

export const f = {
  do: connectFn,
  doCtx: doFn,
  doCtxDeep: doFnDeep,
}

export const d = connectFn
export const dc = doFn
export const dcd = doFnDeep

export const argsToObject = (args: [string, string][]) =>
  flow(argsToArray, f.do(objectFromArray, pass, ...args))
