import { MapLayer, Nullable } from "~/entities";
import { createSharedComposable } from "@vueuse/core";
import { shallowRef } from "@vue/reactivity";

export const useLayer = createSharedComposable(() => {
  let layer = shallowRef<Nullable<MapLayer>>(null)

  return {
    layer,
  }
});
