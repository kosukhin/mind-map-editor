import {useOverlay} from "~/composables/useOverlay";
import {watch} from "@vue/runtime-core";

export const useOverlayAutoClose = (formName: string) => {
  const {tryToClose, close} = useOverlay();

  watch(tryToClose, () => {
    tryToClose.map(vClose => {
      if (vClose === formName) {
        close();
      }
    });
  });
}
