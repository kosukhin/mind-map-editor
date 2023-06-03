import get from 'lodash/get.js'

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
      if (!args) {
        args = [DEFAULT_RESULT_KEY] as (keyof T)[]
      }
      const callArgs = args.map((arg) => get(state, arg, arg))
      state[saveTo] = fn(...callArgs)
      if (state[DEBUG_KEY]) {
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
          state[saveTo]
        )
      }
      return state[saveTo]
    }
  }
}
