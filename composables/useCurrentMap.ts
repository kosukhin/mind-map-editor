import {useRoute} from "vue-router";
import {createSharedComposable} from "@vueuse/core";
import {getMap, saveMap} from "~/requests";
import {MapStructure, Maybe} from "~/entities";
import {reactive} from "@vue/reactivity";
import {watch} from "@vue/runtime-core";
import {useNotify} from "~/composables";
import {MAP_UPDATED} from "~/constants";

export const useCurrentMap = createSharedComposable(() => {
  const {message} = useNotify();
  const map = reactive(Maybe<MapStructure>())
  const route = useRoute();
  const mapName = route.path.replace('/', '');

  getMap(mapName).then(m => {
    map.value = m;
  })

  watch(map, () => {
    map.map(vMap => {
      saveMap(vMap);
      message.value = MAP_UPDATED;
    })
  }, {
    deep: true
  })

  return {
    map,
    mapName,
  }
});
