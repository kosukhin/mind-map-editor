import { createSharedComposable } from '@vueuse/core';
import { ref } from 'vue';
import { Settings } from '@/entities';

export const useSettings = createSharedComposable(() => {
  const settings = ref<Settings>({
    isEditable: true,
  });

  return {
    settings,
  };
});
