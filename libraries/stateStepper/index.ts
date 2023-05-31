import isFunction from 'lodash/isFunction.js'
import get from 'lodash/get.js'

const DEFAULT_RESULT_KEY = 'prevResult'
const defaultState = { [DEFAULT_RESULT_KEY]: null }

export type Step<T extends typeof defaultState> = (
  fn: Function,
  args: (keyof T | Function)[],
  saveTo: keyof T
) => any
export type State = <F extends Function>(fn: F) => () => ReturnType<F>
export type StateStepperFactory<T> = (step: Step<T>, state: State) => any

export function stateStepper<T extends any>(
  stateObject: T,
  factory: StateStepperFactory<T>
) {
  const step = createStep(stateObject)
  const state = (fn: Function) => () => fn(stateObject)
  const mainCallback = factory(step, state)
  return mainCallback()
}

function createStep<T>(state: T): Step<T> {
  return (fn, args, saveTo = DEFAULT_RESULT_KEY) => {
    return (value: any) => {
      state[DEFAULT_RESULT_KEY] = value
      const callArgs = args.map((arg) => {
        if (isFunction(arg)) {
          return arg
        }
        return get(state, arg)
      })
      state[saveTo] = fn(...callArgs)
      return state[saveTo]
    }
  }
}
