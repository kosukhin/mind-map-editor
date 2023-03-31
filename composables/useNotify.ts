import { reactive } from '@vue/reactivity'
import { createSharedComposable } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { Maybe } from '~/entities'
import { NOTIFY_DELAY } from '~/constants'
import { setValue } from '~/utils'

export const useNotify = createSharedComposable(() => {
  const message = reactive(Maybe<string>())

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
