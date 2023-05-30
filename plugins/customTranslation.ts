import { defineNuxtPlugin } from '#imports'

const GENERAL_KEY_PREFIX = 'general.'
const KEY_FIRST_SEGMENT_REGEXP = /^[^.]+\./

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$i18n.setMissingHandler((...args) => {
    const isDev = process.dev
    const key = args[1]

    if (key.indexOf(GENERAL_KEY_PREFIX) === 0) {
      return key
    }

    const generalKey = key.replace(KEY_FIRST_SEGMENT_REGEXP, GENERAL_KEY_PREFIX)
    const result = nuxtApp.$i18n.t(generalKey)

    if (isDev && result === generalKey) {
      // eslint-disable-next-line no-console
      console.warn(
        `[i18n] Translation was not found keys: ${key}, ${generalKey}`
      )
    }

    return result
  })
})
