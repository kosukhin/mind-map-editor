import { MapLayer, Maybe } from "~/entities";
import { createSharedComposable } from "@vueuse/core";
import { shallowReactive } from "@vue/reactivity";

export const useLayer = createSharedComposable(() => {
  let layer = shallowReactive(Maybe<MapLayer>())

  return {
    layer,
  }
});
