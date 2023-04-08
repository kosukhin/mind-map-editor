import { createSharedComposable } from '@vueuse/core'
import { ref } from '@vue/reactivity'

export const useLocks = createSharedComposable(() => {
  const isClickLocked = ref(false)

  return {
    isClickLocked,
  }
})
