import curry from 'lodash/fp/curry'

interface Valuable {
  value: any
}

export const setProperty = curry(
  (target: any, property: string, value: any) => {
    target[property] = value
  }
)

export const setValue = curry((valuable: Valuable, value: any) => {
  valuable.value = value
})

export const setValues = (valuables: [Valuable, value: any][]) => {
  valuables.forEach(([valuable, value]) => {
    valuable.value = value
  })
}
