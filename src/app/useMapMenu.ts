import { computed } from 'vue';
import { branchCombinator } from '@/modules/combinators/branchCombinator';
import { modelsPoolGet } from '@/modulesHigh/models/modelsPool';
import { MapStructure } from '@/entities/Map';
import { mapTransformer } from '@/modules/map/mapTransformer';
import { compose } from 'lodash/fp';
import { overlayController } from '@/modulesHigh/overlay/overlayController';
import { mapController } from '@/modulesHigh/map/mapController';

/**
 * Меню карты открытой
 */
export const useMapMenu = () => {
  const menuItems = computed(
    () => {
      const mapModel = modelsPoolGet<MapStructure>('map');
      return branchCombinator.when(mapModel, () => mapTransformer.menuItems(mapModel), []);
    },
  );

  const selectMenuItem = compose(
    overlayController.close,
    mapController.scrollToObject,
  );

  return {
    menuItems,
    selectMenuItem,
  };
};
