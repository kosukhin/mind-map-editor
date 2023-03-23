import {useCurrentMap, useLayer} from "~/composables";
import {addObjectToLayer} from "~/utils";
import {watchEffect} from "@vue/runtime-core";
import {allSet, MapStructure} from "~/entities";

export const useCurrentMapRenderer = () => {
  const {layer} = useLayer();
  const {map} = useCurrentMap();

  watchEffect(() => {
    allSet([layer, map]).map(([vLayer, vMap]) => {
      for (const object of Object.values((vMap as MapStructure).objects)) {
        addObjectToLayer(vLayer, object, vMap.types);
      }
    });
  });

  return {
    map,
  }
}
