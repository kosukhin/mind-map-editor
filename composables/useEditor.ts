import { useRoute } from "vue-router";
import { watch } from "@vue/runtime-core";
import { getMap } from "~/requests/getMap";
import { addObjectToLayer } from "~/utils/konva/addObjectToLayer";
import { createLayer } from "~/utils/konva/createLayer";
import {Nullable} from "~/entities/types/Nullable";
import { MapStructure } from "~/entities/Map";

const currentMap = ref<Nullable<MapStructure>>(null)

export function useEditor(editorWrapper: HTMLElement) {
  const fullRenderCounter = ref(0);
  const route = useRoute();

  watch(fullRenderCounter, async () => {
    await fullRenderCurrentMap(route.path, editorWrapper);
  })

  return {
    fullRenderCounter,
    currentMap,
  }
}

async function fullRenderCurrentMap(currentPath: string, editorWrapper: HTMLElement) {
  const mapName = currentPath.replace('/', '');
  const map = await getMap(mapName);
  const layer = await createLayer(editorWrapper);
  currentMap.value = map;

  for (const object of Object.values(map.objects)) {
    addObjectToLayer(layer, object, map.types);
  }
}
