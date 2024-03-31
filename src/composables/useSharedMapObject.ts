import { ref, watch } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import { useSharedMap } from '@/composables/useSharedMap';
import { MapObject } from '@/entities/Map';
import { isNotNullish } from '@/utils/isNotNullish';
import { currentObjectSet } from '@/application/currentObjectSet';
import { currentObjectSetAdditionalFields } from '@/application/currentObjectSetAdditionalFields';
import { vueWithList } from '@/utils/vueWithList';

export const useSharedMapObject = createSharedComposable(() => {
  const { map } = useSharedMap();
  const fastPreviewIsLocked = ref(false);
  const fastPreviewObjectId = ref<number>();
  const currentObjectId = ref<number>();
  const currentObject = ref<MapObject>();

  watch([currentObjectId, map], () => {
    vueWithList([currentObjectId, map])
      .ensureEvery(isNotNullish).apply(currentObjectSet(currentObject));

    vueWithList([map, currentObject])
      .ensureEvery(isNotNullish).apply(currentObjectSetAdditionalFields);
  });

  return {
    currentObjectId,
    currentObject,
    fastPreviewObjectId,
    fastPreviewIsLocked,
  };
});
