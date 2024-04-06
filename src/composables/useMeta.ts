import { useMap } from '@/composables/useMap';
import { watch, reactive, watchEffect } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import { ReactiveHead } from '@vueuse/head';

export const useMeta = createSharedComposable(() => {
  const head = reactive<ReactiveHead>({
    title: 'Идет загрузка...',
  });

  const { firstMapLoad, map } = useMap();
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
