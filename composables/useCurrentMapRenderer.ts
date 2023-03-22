import { useCurrentMap, useLayer } from "~/composables";
import { addObjectToLayer } from "~/utils";
import { watch } from "@vue/runtime-core";

export const useCurrentMapRenderer = () => {
  const {layer} = useLayer();
  const {map} = useCurrentMap();

  watch([map, layer], async () => {
    if (!(layer.value && map.value)) return;

    for (const object of Object.values(map.value.objects)) {
      addObjectToLayer(layer.value, object, map.value.types);
    }
  });

  return {
    map,
  }
}
