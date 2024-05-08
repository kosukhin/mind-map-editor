import { modelsPoolGetRef, modelsPoolSet } from '@/modulesHigh/models/modelsPool';
import { OVERLAY_CLOSE } from '@/constants/overlays';
import { watch } from '@vue/runtime-core';

export const overlayController = {
  close() {
    modelsPoolSet('overlayName', OVERLAY_CLOSE);
    modelsPoolSet('overlayNameToClose', OVERLAY_CLOSE);
  },

  autoClose(formName: string) {
    const nameToCloseRef = modelsPoolGetRef<string>('overlayNameToClose');
    watch(nameToCloseRef, (nameToClose) => {
      if (nameToClose && nameToClose === formName) {
        overlayController.close();
      }
    });
  },
};
