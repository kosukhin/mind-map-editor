import {reactive, ref} from "@vue/reactivity";
import {Maybe} from "~/entities";
import {createSharedComposable} from "@vueuse/core";
import {OVERLAY_CLOSE} from "~/constants";
import {watch} from "@vue/runtime-core";

export const useOverlay = createSharedComposable(() => {
  const overlayName = reactive(Maybe<string>())
  const tryToClose = reactive(Maybe<string>());
  const history = ref<string[]>([]);

  const close = () => {
    overlayName.value = OVERLAY_CLOSE;
    tryToClose.value = OVERLAY_CLOSE;
  }

  watch(overlayName, () => {
    overlayName.map(vOverlay => {
      if (vOverlay !== OVERLAY_CLOSE) {
        history.value.push(vOverlay);
      } else {
        history.value = [];
      }
    })
  });

  return {
    overlayName,
    tryToClose,
    history,
    close,
  }
})
