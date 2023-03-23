import {reactive} from "@vue/reactivity";
import {Maybe} from "~/entities";
import {createSharedComposable} from "@vueuse/core";

export const useOverlay = createSharedComposable(() => {
  const overlayName = reactive(Maybe<string>())

  return {
    overlayName,
  }
})
