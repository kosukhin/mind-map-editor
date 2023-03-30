import curry from 'lodash/fp/curry'

interface Errorable {
  error: any
}

export const setError = curry((value: Errorable, error: any) => {
  value.error = error
})
