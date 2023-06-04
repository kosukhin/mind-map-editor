import curry from 'lodash/fp/curry.js'

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
export const objectValues = Object.values
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
  v: any[]
) => {
  for (let i = 0; i < limit; i += chunk) {
    fn(v.slice(i, i + chunk))
  }

  return v
}
export const and = (a, b) => a && b
export const or = (a, b) => a || b
export const gt = (a, b) => a > b
export const lt = (a, b) => a < b
export const gte = (a, b) => a >= b
export const lte = (a, b) => a <= b
export const eq = (a, b) => a === b
