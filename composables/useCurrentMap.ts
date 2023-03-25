import {useRoute} from "vue-router";
import {createSharedComposable} from "@vueuse/core";
import {getMap, saveMap} from "~/requests";
import {MapStructure, MaybeError} from "~/entities";
import {reactive} from "@vue/reactivity";
import {watch} from "@vue/runtime-core";
import {useNotify} from "~/composables";
import {MAP_UPDATED} from "~/constants";

export const useCurrentMap = createSharedComposable(() => {
  const {message} = useNotify();
  const map = reactive(MaybeError<MapStructure>())
  const route = useRoute();
  const mapName = route.path.replace('/', '');

  getMap(mapName).then(m => {
    map.value = m;
  }).catch(e => {map.error = e})

  watch(map, () => {
    map.map(vMap => {
      try {
        saveMap(vMap, mapName);
      } catch (e) {
        map.error = String(e);
      }
      message.value = MAP_UPDATED;
    })

    if (map.error) {
      message.value = map.error;
    }
  }, {
    deep: true
  })

  return {
    map,
    mapName,
  }
});
