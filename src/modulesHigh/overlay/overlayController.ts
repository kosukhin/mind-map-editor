import { modelsPoolSet } from '@/modulesHigh/models/modelsPool';
import { OVERLAY_CLOSE } from '@/constants/overlays';

export const overlayController = {
  close() {
    modelsPoolSet('overlayName', OVERLAY_CLOSE);
    modelsPoolSet('overlayNameToClose', OVERLAY_CLOSE);
  },
};
