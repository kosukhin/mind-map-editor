import curry from 'lodash/fp/curry.js'
import sum from 'lodash/sum.js'
import { normal } from 'color-blend'

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

export const maxNewLineLength = (str: string): number => {
  if (!str) {
    return 0
  }
  return Math.max.apply(
    null,
    str.split('\n').map((str) => str.length)
  )
}

export const newLineCount = (str: string): number => {
  if (!str) {
    return 0
  }
  return str.split('\n').length
}

export const nl2br = (str: string, isXhtml: boolean = false) => {
  if (typeof str === 'undefined' || str === null) {
    return ''
  }
  const breakTag = isXhtml || typeof isXhtml === 'undefined' ? '<br />' : '<br>'
  return (str + '').replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    '$1' + breakTag + '$2'
  )
}

export const stripHtml = (string: string) => {
  return string.replace(/<\/?[^>]+>/gi, ' ')
}

export const debug = (string: string, tag: string = 'DEBUG') => {
  if (process.env.NODE_ENV === 'production') {
    return
  }
  if (['dragmove'].includes(tag)) {
    return
  }
  const { log } = console
  log && log(`['${tag}'] ${string}`)
}

export function objectToValues(obj: object) {
  return Object.values(obj)
}

export function average(values: number[]) {
  return Math.round(sum(values) / values.length)
}

export function apply(args: any[] | any, fn: Function) {
  if (Array.isArray(args)) {
    return fn(...args)
  }

  return fn(args)
}

export function calculateProgressBg(progress: number) {
  const progressRest = 1 - progress
  const red = { r: 255, g: 0, b: 0, a: progressRest }
  const green = { r: 0, g: 255, b: 0, a: progress }
  return normal(red, green)
}
