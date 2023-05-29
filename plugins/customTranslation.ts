import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      ft: (key: string) => {
        let result = nuxtApp.$i18n.t(key)

        if (result === key) {
          const parts = result.split('.')
          parts[0] = 'general'
          result = nuxtApp.$i18n.t(parts.join('.'))
        }

        return result
      },
    },
  }
})
