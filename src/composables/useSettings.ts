import { createSharedComposable } from '@vueuse/core';
import { Settings } from '@/entities';
import { ref } from 'vue';

export const useSettings = createSharedComposable(() => {
  const settings = ref<Settings>({
    isEditable: true,
  });

  return {
    settings,
  };
});
