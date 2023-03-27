import {useCurrentMap, useLayer} from "~/composables";
import {addObjectToLayer} from "~/utils";
import {allSet} from "~/entities";
import {watchOnce} from "@vueuse/core";
import {computed} from "@vue/reactivity";

export const useCurrentMapRenderer = () => {
  const {layer, layerObjects} = useLayer();
  const {map} = useCurrentMap();

  const allInit = computed(() =>
    allSet([layer, map] as const).map(() => true)
  );

  watchOnce(allInit, () => {
    allSet([layer, map] as const).map(async ([vLayer, vMap]) => {
      for (const object of Object.values(vMap.objects)) {
        const objects = await addObjectToLayer(vLayer, object, vMap);
        layerObjects.set(object.id, objects);
      }
    });
  });

  return {
    map,
    allInit,
  }
}
