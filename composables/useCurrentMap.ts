import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { createSharedComposable } from "@vueuse/core";
import { getMap } from "~/requests";
import { Nullable, MapStructure } from "~/entities";

export const useCurrentMap = createSharedComposable(() => {
  const map = ref<Nullable<MapStructure>>(null)
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
