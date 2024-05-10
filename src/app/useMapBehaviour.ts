import { compose } from 'lodash/fp';
import { overlayController } from '@/modulesHigh/overlay/overlayController';
import { mapController } from '@/modulesHigh/map/mapController';

export const useMapBehaviour = () => {
  const moveToObject = compose(
    overlayController.close,
    mapController.scrollToObject,
  );

  return {
    moveToObject,
  };
};
