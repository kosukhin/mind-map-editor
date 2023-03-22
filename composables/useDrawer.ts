import { reactive } from "@vue/reactivity";
import { Maybe } from "~/entities";
import { createSharedComposable } from "@vueuse/core";

export const useDrawer = createSharedComposable(() => {
  const drawer = reactive(Maybe<string>())

  return {
    drawer,
  }
})