import { createSharedComposable, useLocalStorage } from '@vueuse/core'
import { watch } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import { reMaybe } from '~/utils'

export const useSharedLocks = createSharedComposable(() => {
  const isClickLocked = ref(false)
  const isDragLocked = useLocalStorage('drag-locked', false)
  const maybeDragLocked = reMaybe<boolean>()
  watch(
    isDragLocked,
    () => {
      maybeDragLocked.value = isDragLocked.value
    },
    {
      immediate: true,
    }
  )

  return {
    isClickLocked,
    isDragLocked,
    maybeDragLocked,
  }
})
