import { ref, watch } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import { useSharedMap } from '@/composables/useSharedMap';
import { MapType } from '@/entities/Map';
import { setValue } from '@/utils/common';

type StrNum = string | number

export const useSharedMapType = createSharedComposable(() => {
  const { map } = useSharedMap();
  const currentTypeId = ref<StrNum>();
  const currentType = ref<MapType>();
  watch(currentTypeId, () => {
    if (map.value && currentTypeId.value) {
      setValue(currentType, map.value.types[currentTypeId.value]);
    }
  });

  return {
    currentTypeId,
    currentType,
  };
});
