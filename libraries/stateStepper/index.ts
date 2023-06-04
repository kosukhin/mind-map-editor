import get from 'lodash/get.js'
import curry from 'lodash/curry.js'
import clone from 'lodash/clone.js'

const DEBUG_KEY = '__debug'
const DEFAULT_RESULT_KEY = 'prevResult'
const defaultState = { [DEFAULT_RESULT_KEY]: null }

const log = (...args: string[]) => console.log(...args)

export type Step<T extends typeof defaultState> = (
  fn: Function,
  args?: (keyof T | Function)[],
  saveTo?: keyof T
) => any
export type State = <F extends Function>(fn: F) => () => ReturnType<F>
export type StateStepperFactory<T> = (step: Step<T>, state: State) => any
export type StateWrapper<T> = { state: T }

export function stateStepper<
  A extends string[],
  T extends Record<A[number], any>
>(args: A, stateObject: T, factory: StateStepperFactory<T>) {
  const stateWrapper: StateWrapper<T> = { state: stateObject }
  const step = createStep(stateWrapper)
  const state = (fn: Function) => () => fn(stateObject)
  const mainCallback = factory(step, state)
  return curry((...runArgs: any[]) => {
    if (stateWrapper.state[DEBUG_KEY]) {
      log('--- BEGIN --- \n')
    }
    stateWrapper.state = clone(stateObject)
    args.forEach((arg, index) => {
      stateWrapper.state[arg] = runArgs[index] ?? null
    })
    return mainCallback()
  }, args.length)
}

function createStep<T>(stateWrapper: StateWrapper<T>): Step<T> {
  return function step(fn, args, saveTo = DEFAULT_RESULT_KEY) {
    return function stepRunner(value: any) {
      stateWrapper.state[DEFAULT_RESULT_KEY] = value
      if (!args) {
        args = [DEFAULT_RESULT_KEY] as (keyof T)[]
      }
      const callArgs = args.map((arg) => get(stateWrapper.state, arg, arg))
      stateWrapper.state[saveTo] = fn(...callArgs)
      if (stateWrapper.state[DEBUG_KEY]) {
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
          stateWrapper.state[saveTo]
        )
      }
      return stateWrapper.state[saveTo]
    }
  }
}
