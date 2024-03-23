import { mapNormalizeBeforeSave } from '@/application/mapNormalizeBeforeSave';
import { useRequestGetMap } from '@/composables/useRequestGetMap';
import { useRequestSaveMap } from '@/composables/useRequestSaveMap';
import { useSharedNotify } from '@/composables/useSharedNotify';
import { MAP_UPDATED } from '@/constants/messages';
import { NOTIFY_ERROR, NOTIFY_SUCCESS } from '@/constants/system';
import { MapStructure, MapType } from '@/entities/Map';
import { setError, setValue, setValues } from '@/utils/common';
import { mapUrlToName } from '@/utils/mapUrlToName';
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
import { createSharedComposable } from '@vueuse/core';
import { useRoute } from 'vue-router';

export const useSharedMap = createSharedComposable(() => {
  const { message } = useSharedNotify();
  const firstMapLoad = ref(false);
  const parentTypes = ref<MapType[]>([]);
  const map = ref<MapStructure>();
  const mapError = ref({ error: null });
  const route = useRoute();
  const mapName = ref(route.path.replace('/', ''));
  const { getMap } = useRequestGetMap();
  const { saveMap } = useRequestSaveMap();

  watch(
    map,
    () => {
      if (map.value) {
        // eslint-disable-next-line no-restricted-globals
        const normalMap = mapNormalizeBeforeSave(map.value, location.pathname);
        saveMap(normalMap, mapName.value)
          .then(() => {
            setValue(message, [MAP_UPDATED, NOTIFY_SUCCESS]);
          })
          .catch((e) => {
            setError(mapError.value, String(e));
            setValue(message, [mapError.value.error, NOTIFY_ERROR]);
          });
      }
    },
    {
      deep: true,
    },
  );

  const openMapOfCurrentUrl = () => {
    firstMapLoad.value = false;
    mapName.value = mapUrlToName(route.path);

    getMap(mapName.value)
      .then(([vMap, vParentTypes]) => {
        setValues([
          [map, vMap],
          [parentTypes, vParentTypes],
          [firstMapLoad, true],
        ]);
      })
      .catch(setError(mapError.value));
  };

  watch(
    route,
    openMapOfCurrentUrl,
    {
      immediate: true,
    },
  );

  return {
    map,
    firstMapLoad,
    parentTypes,
    mapName,
    openMapOfCurrentUrl,
  };
});
