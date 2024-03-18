import { ref, watch } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import { setValue } from '@/utils/common';
import { NOTIFY_DELAY } from '@/constants/system';

export const useSharedNotify = createSharedComposable(() => {
  const message = ref<[string, string]>();
  watch(message, () => {
    if (message.value) {
      setTimeout(() => {
        setValue(message, null);
      }, NOTIFY_DELAY);
    }
  });

  return {
    message,
  };
});
