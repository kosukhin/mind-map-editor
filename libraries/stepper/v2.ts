import isFunction from 'lodash/isFunction.js'
import isObject from 'lodash/isObject.js'
import get from 'lodash/get.js'
import set from 'lodash/set.js'
import flow from 'lodash/flow.js'

export class StepContainer {
  private state: Record<string, any>

  constructor(state) {
    this.state = state
  }

  get(key: string, defaultValue: any = '') {
    return get(this.state, key, defaultValue)
  }

  set(key: string, value: any) {
    set(this.state, key, value)
  }
}

const DEBUG_KEY = '__debug'
const DEFAULT_RESULT_KEY = 'prevResult'
const log = (...args: string[]) => console.log(...args)

export type Step = {
  (fn: Function, saveTo?: string): any
  (fn: Function, args?: any[], saveTo?: string): any
  (fn: Function, args?: any[]): any
}

export const aliases = {
  $: step,
  $s: stepper,
  $r: stepperResult,
  $c: clearStep,
  $v: stepValue,
}

export function stepper(args = [], vars = []) {
  return (...realArgs) => {
    const state = {}
    vars.forEach((variable) => {
      state[variable] = variable === DEBUG_KEY ? true : null
    })
    args.forEach((arg, index) => {
      state[arg] = realArgs[index] ?? null
    })
    const container = new StepContainer(state)
    if (container.get(DEBUG_KEY)) {
      log('--- BEGIN --- ')
    }
    return new StepContainer(state)
  }
}

export function clearStep(fn: any, args: any[]) {
  return (value: any) => {
    const realArgs = args.map((arg) => {
      if (arg === DEFAULT_RESULT_KEY) {
        arg = value
      }
      return arg
    })
    return fn(...realArgs)
  }
}

export function step(fn: any, args?: any, saveTo?: any): Step {
  if (typeof args === 'string') {
    saveTo = args
    args = []
  }
  if (!saveTo) {
    saveTo = DEFAULT_RESULT_KEY
  }
  return (value: any) => {
    if (!(value instanceof StepContainer)) {
      throw new TypeError(
        'step can be used only with StepContainer, given: ' +
          JSON.stringify(value) +
          ' ,fn:' +
          fn.name +
          ', args:' +
          JSON.stringify(args)
      )
    }
    if (!args || !args.length) {
      args = [DEFAULT_RESULT_KEY]
    }
    const callArgs = args.map((arg, index) => {
      if (typeof arg !== 'undefined' && !isFunction(arg) && isObject(arg)) {
        throw new Error(
          `StepperError: argument ${JSON.stringify(
            arg
          )} at index ${index} in function ${
            fn.name
          } must not be object, because it will be shared`
        )
      }
      return value.get(arg, arg)
    })
    value.set(saveTo, fn(...callArgs))
    if (value.get(DEBUG_KEY)) {
      log(
        '\n',
        '[STEP] ',
        'fn:',
        fn.name,
        '\n ---------- \n',
        `args(${JSON.stringify(args)}): `,
        JSON.stringify(callArgs),
        '\n ---------- \n',
        `saveTo(${saveTo}):`,
        JSON.stringify(value.get(saveTo))
      )
    }
    return value
  }
}

export function stepperResult(key?: string, defaultValue?: string[]) {
  if (!key) {
    key = DEFAULT_RESULT_KEY
  }
  return (value: StepContainer) => {
    return value.get(key as string, defaultValue)
  }
}

export function stepValue(fn: Function) {
  return flow(fn, stepperResult())
}
