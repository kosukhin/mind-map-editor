import curry from 'lodash/fp/curry'

interface ErrorFull {
  error: any
}

export const setError = curry((value: ErrorFull, error: any) => {
  value.error = error
})

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

export const urlTrim = (url: string) => {
  if (url[url.length - 1] === '/') {
    const urlArr = url.split('')
    urlArr.splice(urlArr.length - 1, 1)
    return urlArr.join('')
  }

  return url
}
