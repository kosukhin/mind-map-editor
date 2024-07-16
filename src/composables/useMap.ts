import { mapNormalizeBeforeSave } from '@/application/mapNormalizeBeforeSave';
import { useNotify } from '@/composables/useNotify';
import { useRequestSaveMap } from '@/composables/useRequestSaveMap';
import { MAP_UPDATED } from '@/constants/messages';
import { NOTIFY_ERROR, NOTIFY_SUCCESS } from '@/constants/system';
import { MapFile, MapStructure, MapType } from '@/entities/Map';
import { AnyFn } from '@/entities/Utils';
import { OptionalExpression } from '@/modules/eo/OptionalExpression';
import { WatchedExpression } from '@/modules/eo/WatchedExpression';
import { modelsPoolSet } from '@/modulesHigh/models/modelsPool';
import { useEditor } from '@/plugins/editor';
import { setError, setValue } from '@/utils/common';
import { mapUrlToName } from '@/utils/mapUrlToName';
import { watch } from '@vue/runtime-core';
import { createSharedComposable } from '@vueuse/core';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const useMap = createSharedComposable(() => {
  const editor = useEditor();
  const optionalMap = editor.chainFilled((edt) => edt.currentMap());
  const mapFile = new OptionalExpression(optionalMap).subscribeToSettled();

  const map = new WatchedExpression<MapStructure>(
    mapFile.valueRef(),
    (mapFileLocal: MapFile) => mapFileLocal.current,
    { immediate: true },
  ).beginWatch().valueRef();

  const { message } = useNotify();
  const firstMapLoad = ref(false);
  const parentTypes = ref<MapType[]>([]);
  modelsPoolSet('map', map);
  const mapError = ref({ error: null });
  const route = useRoute();
  const router = useRouter();
  const mapName = ref(route.path.replace('/', ''));
  const { saveMap } = useRequestSaveMap();
  const afterMapSavedFns: AnyFn[] = [];

  watch(
    map,
    () => {
      if (map.value) {
        if (map.value.url !== route.path) {
          router.push(map.value.url);
        }

        // eslint-disable-next-line no-restricted-globals
        const normalMap = mapNormalizeBeforeSave(map.value, location.pathname);
        saveMap(normalMap, mapName.value)
          .then(() => {
            setValue(message, [MAP_UPDATED, NOTIFY_SUCCESS]);
            afterMapSavedFns.forEach((fn) => fn());
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

  const isLoading = ref(false);

  const openMapOfCurrentUrl = () => {
    firstMapLoad.value = false;
    mapName.value = mapUrlToName(route.path);
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
    isLoading,
    afterMapSavedFns,
  };
});
