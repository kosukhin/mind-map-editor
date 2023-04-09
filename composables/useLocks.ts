import { createSharedComposable, useLocalStorage } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { reMaybe } from '~/utils'

export const useLocks = createSharedComposable(() => {
  const isClickLocked = useLocalStorage('click-locked', false)
  const maybeClickLocked = reMaybe<boolean>()

  watch(
    isClickLocked,
    () => {
      maybeClickLocked.value = isClickLocked.value
    },
    {
      immediate: true,
    }
  )

  return {
    isClickLocked,
    maybeClickLocked,
  }
})
