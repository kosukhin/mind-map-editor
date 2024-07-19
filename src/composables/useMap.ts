import { useNotify } from '@/composables/useNotify';
import { useRequestSaveMap } from '@/composables/useRequestSaveMap';
import { MapFile, MapStructure, MapType } from '@/entities/Map';
import { AnyFn } from '@/entities/Utils';
import { OptionalExpression } from '@/modules/eo/v2/system/OptionalExpression';
import { WatchedExpression } from '@/modules/eo/v2/system/WatchedExpression';
import { modelsPoolSet } from '@/modulesHigh/models/modelsPool';
import { useEditor } from '@/plugins/editor';
import { mapUrlToName } from '@/utils/mapUrlToName';
import { watch } from '@vue/runtime-core';
import { createSharedComposable } from '@vueuse/core';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { optionalMapFile } = useEditor();
const mapFile = new OptionalExpression(optionalMapFile.value()).init().valueRef();

export const useMap = createSharedComposable(() => {
  const map = new WatchedExpression<MapStructure>(
    mapFile,
    (mapFileLocal: MapFile) => {
      console.log('map watched', mapFileLocal.current);

      return mapFileLocal.current;
    },
    {
      immediate: true,
    },
  ).init().valueRef();

  const { message } = useNotify();
  const firstMapLoad = ref(false);
  const parentTypes = ref<MapType[]>([]);
  modelsPoolSet('map', map);
  const route = useRoute();
  const router = useRouter();
  const mapName = ref(route.path.replace('/', ''));
  const afterMapSavedFns: AnyFn[] = [];

  watch(
    map,
    () => {
      setTimeout(() => {
        if (map.value) {
          if (map.value.url !== route.path) {
            router.push(map.value.url);
            mapName.value = mapUrlToName(map.value.url);
          }
        }
      }, 200);
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
