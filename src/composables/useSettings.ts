import { Settings } from '@/entities/Settings';
import { createSharedComposable } from '@vueuse/core';
import { ref } from 'vue';

export const useSettings = createSharedComposable(() => {
  const settings = ref<Settings>({
    isEditable: true,
  });

  return {
    settings,
  };
});
