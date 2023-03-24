import {MapLayer, MapStage, Maybe} from "~/entities";
import {createSharedComposable} from "@vueuse/core";
import {shallowReactive} from "@vue/reactivity";

export const useLayer = createSharedComposable(() => {
  const layer = shallowReactive(Maybe<MapLayer>());
  const stage = shallowReactive(Maybe<MapStage>());
  const layerObjects = new Map();

  return {
    layer,
    stage,
    layerObjects
  }
});
