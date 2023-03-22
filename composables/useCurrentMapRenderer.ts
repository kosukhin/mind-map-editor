import { useCurrentMap, useLayer } from "~/composables";
import { addObjectToLayer } from "~/utils";
import { watch } from "@vue/runtime-core";

export const useCurrentMapRenderer = () => {
  const {layer} = useLayer();
  const {map} = useCurrentMap();

  watch([map, layer], async () => {
    layer.map((vLayer) => {
      map.map((vMap) => {
        for (const object of Object.values(vMap.objects)) {
          addObjectToLayer(vLayer, object, vMap.types);
        }
      })
    })
  });

  return {
    map,
  }
}
