import { createSharedComposable } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { reMaybe, setValue } from '~/utils'
import { NOTIFY_DELAY } from '~/constants'

export const useNotify = createSharedComposable(() => {
  const message = reMaybe<[string, string]>()

  watch(message, () => {
    message.map(() => {
      setTimeout(() => {
        setValue(message, null)
      }, NOTIFY_DELAY)
    })
  })

  return {
    message,
  }
})
