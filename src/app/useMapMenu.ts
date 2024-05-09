import { computed } from 'vue';
import { branchCombinator } from '@/modules/combinators/branchCombinator';
import { modelsPoolGet } from '@/modulesHigh/models/modelsPool';
import { MapStructure } from '@/entities/Map';
import { mapTransformer } from '@/modules/map/mapTransformer';

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
