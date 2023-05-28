import isFunction from 'lodash/isFunction'
import get from 'lodash/get'

export function stateStepper(stateObject: any, factory: Function) {
  const step = createStep(stateObject)
  const state = (fn: Function) => fn(stateObject)
  const mainCallback = factory(step, state)
  return mainCallback()
}

function createStep(state: any) {
  return (fn: Function, args: (string | Function)[], saveTo = 'prevResult') => {
    return () => {
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
