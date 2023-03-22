import { MapLayer } from "~/entities/MapLayer";
import { createSharedComposable } from "@vueuse/core";
import { shallowRef } from "@vue/reactivity";
import {Nullable} from '~/entities/types/Nullable';

export const useLayer = createSharedComposable(() => {
  let layer = shallowRef<Nullable<MapLayer>>(null)

  return {
    layer,
  }
});
