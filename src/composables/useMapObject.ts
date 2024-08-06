import { ref, watch } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import { useMap } from '@/composables/useMap';
import { MapObjectStructure } from '@/objects/entities/MapStructures';
import { isNotNullish } from '@/utils/isNotNullish';
import { currentObjectSet } from '@/application/currentObjectSet';
import { currentObjectSetAdditionalFields } from '@/application/currentObjectSetAdditionalFields';
import { vueWithList } from '@/utils/vueWithList';
import { cloneObject } from '@/utils/konva';
import { useOverlay } from '@/composables/useOverlay';
import { useLayer } from '@/composables/useLayer';

export const useMapObject = createSharedComposable(() => {
  const fastPreviewIsLocked = ref(false);
  const fastPreviewObjectId = ref<number>();
  const currentObjectId = ref<number>();
  const currentObject = ref<MapObjectStructure>();
  const { map } = useMap();

  watch([currentObjectId, map], () => {
    vueWithList([currentObjectId, map])
      .ensureEvery(isNotNullish).apply(currentObjectSet(currentObject));

    vueWithList([map, currentObject])
      .ensureEvery(isNotNullish).apply(currentObjectSetAdditionalFields);
  });

  const { close } = useOverlay();
  const { layer, layerObjects } = useLayer();

  const clone = async (objectId: number | null = null) => {
    let object = currentObject.value;

    if (objectId && map.value && map.value.objects[objectId]) {
      object = map.value.objects[objectId];
    }

    close();
    if (object && map.value && layer.value) {
      await cloneObject(object, map.value, layer.value, layerObjects);
    }
  };

  return {
    clone,
    currentObjectId,
    currentObject,
    fastPreviewObjectId,
    fastPreviewIsLocked,
  };
});
