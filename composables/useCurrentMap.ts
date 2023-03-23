import {useRoute} from "vue-router";
import {createSharedComposable} from "@vueuse/core";
import {getMap} from "~/requests";
import {MapStructure, Maybe} from "~/entities";

export const useCurrentMap = createSharedComposable(() => {
  const map = reactive(Maybe<MapStructure>())
  const route = useRoute();
  const mapName = route.path.replace('/', '');

  getMap(mapName).then(m => {
    map.value = m;
  })

  return {
    map,
    mapName,
  }
});
