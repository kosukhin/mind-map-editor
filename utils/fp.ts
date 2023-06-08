import { aliases, StepContainer } from '~/libraries/stepper/v2'

const { $, $s, $r } = aliases

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
export const arraySort = (fn: Function) => (v: any[]) => v.sort(fn)
export const arrayShift = (v: any[]) => v.shift()
export const arrayPush = (v: any[], val: any) => v.push(val)
export const sortAsc = (a, b) => a - b
export const mathCeil = Math.ceil
export const mathSub = (a, b) => a - b
export const mathMultiply = (a, b) => a * b
export const mathDivBy = (by: number) => (v) => v / by
export const pass = (v) => v
export const arrayForEach = (fn: Function, data: any) => {
  return (v: StepContainer) => {
    const vData = data(v)
    vData.forEach((item) => {
      v.set('prevResult', item)
      fn(v)
    })
  }
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
