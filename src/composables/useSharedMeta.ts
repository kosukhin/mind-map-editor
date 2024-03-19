import { useSharedMap } from '@/composables/useSharedMap';
import { watch, reactive, watchEffect } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import { ReactiveHead } from '@vueuse/head';

export const useSharedMeta = createSharedComposable(() => {
  const head = reactive<ReactiveHead>({
    title: 'Идет загрузка...',
  });

  const { firstMapLoad, map } = useSharedMap();
  watch(firstMapLoad, () => {
    if (map.value) {
      head.title = map.value.settings.title;
    }
  });

  watchEffect(() => {
    document.title = String(head.title);
  });

  return {
    head,
  };
});
