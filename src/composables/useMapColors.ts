import { canvasCreateColorsHash } from '@/application/canvasCreateColorsHash';
import { useMap } from '@/composables/useMap';
import { Dictionary } from '@/entities/Dictionary';
import { computed } from '@vue/reactivity';
import { createSharedComposable } from '@vueuse/core';

export const useMapColors = createSharedComposable(() => {
  const { map } = useMap();
  const colorsHash = computed<Dictionary<string>>(
    () => (map.value ? canvasCreateColorsHash(map.value) : {}),
  );

  return {
    colorsHash,
  };
});
