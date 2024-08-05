import { computed } from 'vue';
import { branchCombinator } from '@/modules/combinators/branchCombinator';
import { modelsPoolGet } from '@/modulesHigh/models/modelsPool';
import { MapStructure } from '@/entities/MapStructures';
import { mapTransformer } from '@/modules/map/mapTransformer';

/**
 * Menu of current opened map
 */
export const useMapMenu = () => {
  const menuItems = computed(
    () => {
      const mapModel = modelsPoolGet<MapStructure>('map');
      return branchCombinator.when(mapModel, () => mapTransformer.menuItems(mapModel), []);
    },
  );

  return {
    menuItems,
  };
};
