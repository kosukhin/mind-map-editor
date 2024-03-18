import { canvasCreateColorsHash } from '@/application/canvasCreateColorsHash';
import { useSharedMap } from '@/composables/useSharedMap';
import { Dictionary } from '@/entities/Dictionary';
import { computed } from '@vue/reactivity';
import { createSharedComposable } from '@vueuse/core';

export const useSharedMapColors = createSharedComposable(() => {
  const { map } = useSharedMap();
  const colorsHash = computed<Dictionary<string>>(
    () => (map.value ? canvasCreateColorsHash(map.value) : {}),
  );

  return {
    colorsHash,
  };
});
