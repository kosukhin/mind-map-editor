import { createSharedComposable } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { reMaybe } from '~/entities'
import { NOTIFY_DELAY } from '~/constants'
import { setValue } from '~/utils'

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
