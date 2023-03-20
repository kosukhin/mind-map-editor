import { MapStructure } from "~/entities/Map";
import {Nullable} from "~/entities/types/Nullable";
import { ref } from "@vue/reactivity";
import { getMap } from "~/requests/getMap";
import { useRoute } from "vue-router";
import { createSharedComposable } from "@vueuse/core";

const currentMap = () => {
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
}

export const useCurrentMap = createSharedComposable(currentMap);
