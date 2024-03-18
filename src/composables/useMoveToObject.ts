import { useMapPartialRenderer } from '@/composables/useMapPartialRenderer';
import { useSharedLayer } from '@/composables/useSharedLayer';
import { useSharedMap } from '@/composables/useSharedMap';
import { createSharedComposable } from '@vueuse/core';

export const useMoveToObject = createSharedComposable(() => {
  const { stage } = useSharedLayer();
  const { map } = useSharedMap();
  const { triggerPartialRendering } = useMapPartialRenderer();

  const scrollToObject = (id: string) => {
    if (stage.value && map.value) {
      const object = map.value.objects[id];
      if (!object) {
        return;
      }
      const x = object.position[0] * -1 + 20;
      const y = object.position[1] * -1 + 20;
      stage.value.position({ x, y });
      triggerPartialRendering();
    }
  };

  return {
    scrollToObject,
  };
});
