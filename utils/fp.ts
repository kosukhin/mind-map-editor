import curry from 'lodash/fp/curry.js'
import { step } from '~/libraries/stepper/v2'

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

export const clone = (v: any) => JSON.parse(JSON.stringify(v))
export const inject = (obj: any) => () => obj
export const objectValues = Object.values
export const objectCreate = () => ({})
export const arrayMap = (fn: Function) => (v: any[]) => v.map(fn)
export const arrayForEach = (fn: Function) => (v: any[]) => v.forEach(fn)
export const arraySort = (fn: Function) => (v: any[]) => v.sort(fn)
export const arrayShift = (v: any[]) => v.shift()
export const sortAsc = (a, b) => a - b
export const mathCeil = Math.ceil
export const mathSub = (a, b) => a - b
export const mathMultiply = (a, b) => a * b
export const mathDivBy = (by: number) => (v) => v / by
export const pass = (v) => v
export const iterateGroup = (
  fn: Function,
  limit: number,
  chunk: number,
  data: any[]
) => {
  return (v) => {
    let composition = null
    for (let i = 0; i < limit; i += chunk) {
      if (!composition) {
        composition = step(fn, [data.slice(i, i + chunk)])
      } else {
        composition(step(fn, [data.slice(i, i + chunk)]))
      }
    }

    if (composition) {
      composition(v)
    }

    return v
  }
}
export const and = (a, b) => a && b
export const or = (a, b) => a || b
export const gt = (a, b) => a > b
export const lt = (a, b) => a < b
export const gte = (a, b) => a >= b
export const lte = (a, b) => a <= b
export const eq = (a, b) => a === b
