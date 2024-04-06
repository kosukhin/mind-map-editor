import { ref } from '@vue/reactivity';
import { createSharedComposable } from '@vueuse/core';

export const useSideBar = createSharedComposable(() => {
  const isSidebarOpen = ref(false);

  return {
    isSidebarOpen,
  };
});
