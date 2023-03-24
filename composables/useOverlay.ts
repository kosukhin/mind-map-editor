import {reactive, ref} from "@vue/reactivity";
import {Maybe} from "~/entities";
import {createSharedComposable} from "@vueuse/core";
import {OVERLAY_CLOSE} from "~/constants";

export const useOverlay = createSharedComposable(() => {
  const overlayName = reactive(Maybe<string>())
  const tryToClose = reactive(Maybe<string>());

  const close = () => {
    overlayName.value = OVERLAY_CLOSE;
    tryToClose.value = OVERLAY_CLOSE;
  }

  return {
    overlayName,
    tryToClose,
    close,
  }
})
