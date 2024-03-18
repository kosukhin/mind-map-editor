import { ref, watch } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import { useSharedMap } from '@/composables/useSharedMap';
import { MapObject } from '@/entities/Map';
import { setValue } from '@/utils/common';

export const useSharedMapObject = createSharedComposable(() => {
  const { map } = useSharedMap();
  const currentObjectId = ref<number>();
  const currentObject = ref<MapObject>();
  watch([currentObjectId, map], () => {
    if (currentObjectId.value && map.value) {
      setValue(currentObject, map.value.objects[currentObjectId.value]);
    }
  });
  return {
    currentObjectId,
    currentObject,
  };
});
