import { ref } from '@vue/reactivity'
import { createSharedComposable } from '@vueuse/core'

export const useSharedSideBar = createSharedComposable(() => {
  const isSidebarOpen = ref(false)

  return {
    isSidebarOpen,
  }
})
