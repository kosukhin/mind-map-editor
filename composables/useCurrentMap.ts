import { MapStructure } from "~/entities/Map";
import {Nullable} from "~/entities/types/Nullable";
import { ref } from "@vue/reactivity";
import { getMap } from "~/requests/getMap";
import { useRoute } from "vue-router";

const map = ref<Nullable<MapStructure>>(null)
let isFirstCalled = true;

export function useCurrentMap() {
  const route = useRoute();
  const mapName = route.path.replace('/', '');

  if (isFirstCalled) {
    getMap(mapName).then(m => {
      map.value = m;
      isFirstCalled = false;
    })
  }

  return {
    map,
    mapName,
  }
}
