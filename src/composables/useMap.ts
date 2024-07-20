import { useNotify } from '@/composables/useNotify';
import { MapFile, MapStructure, MapType } from '@/entities/Map';
import { AnyFn } from '@/entities/Utils';
import { Condition } from '@/modules/eo/v2/system/Condition';
import { OptionalExpression } from '@/modules/eo/v2/system/OptionalExpression';
import { WatchedExpression } from '@/modules/eo/v2/system/WatchedExpression';
import { modelsPoolSet } from '@/modulesHigh/models/modelsPool';
import { useEditor } from '@/plugins/editor';
import { mapUrlToName } from '@/utils/mapUrlToName';
import { watch } from '@vue/runtime-core';
import { createSharedComposable } from '@vueuse/core';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { optionalMapFile, logger } = useEditor();
const mapFile = new OptionalExpression(optionalMapFile.value()).init().valueRef();

export const useMap = createSharedComposable(() => {
  const map = new WatchedExpression<MapStructure>(
    mapFile,
    (mapFileLocal: MapFile) => mapFileLocal.current,
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

  const ensureMapNameChanged = new Condition(() => Boolean(map.value && map.value.url !== route.path));
  const ensureMapExisted = new Condition(() => Boolean(map.value));

  watch(
    map,
    () => {
      ensureMapNameChanged.ensure().filled(() => {
        router.push(map.value?.url as string);
      });
      ensureMapExisted.ensure().filled(() => {
        mapName.value = mapUrlToName(map.value?.url as string);
        logger.do(['useMap', 'try to save']);

        optionalMapFile.save({
          ...mapFile.value,
          [mapName.value]: map.value,
        } as MapFile).filled((saveResult) => {
          logger.do(['useMap', 'Сохранено! пытаемся уведомить']);
          message.value = ['Успешно сохранена карта', saveResult ? 'success' : 'error'];
        });
      });
    },
    {
      deep: true,
    },
  );

  const isLoading = ref(false);

  return {
    map,
    firstMapLoad,
    parentTypes,
    mapName,
    isLoading,
    afterMapSavedFns,
  };
});
