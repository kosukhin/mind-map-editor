import {useCurrentMap, useLayer} from "~/composables";
import {addObjectToLayer} from "~/utils";
import {watchEffect} from "@vue/runtime-core";
import {allSet} from "~/entities";

export const useCurrentMapRenderer = () => {
  const {layer} = useLayer();
  const {map} = useCurrentMap();

  watchEffect(() => {
    allSet([layer, map] as const).map(([vLayer, vMap]) => {
      for (const object of Object.values(vMap.objects)) {
        addObjectToLayer(vLayer, object, vMap.types);
      }
    });
  });

  return {
    map,
  }
}
