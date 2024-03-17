import { createSharedComposable } from '@vueuse/core'
import { Settings } from '@/entities'

export const useSettings = createSharedComposable(() => {
  const settings = ref<Settings>({
    isEditable: true,
  })

  return {
    settings,
  }
})
