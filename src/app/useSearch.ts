import { ref } from '@vue/reactivity';
import { computed } from 'vue';
import { modelsPoolGet } from '@/modulesHigh/models/modelsPool';
import { mapTransformer } from '@/modules/map/mapTransformer';
import { MapStructure } from '@/entities/Map';
import { listItemAny } from '@/modules/common/constants';

/**
 * Ability to search by map
 */
export const useSearch = () => {
  const typeField = ref('');
  const queryField = ref('');

  const mapTypes = computed(() => {
    const map = modelsPoolGet<MapStructure>('map');
    return [
      listItemAny,
      ...mapTransformer.typesList(map),
    ];
  });

  return {
    typeField,
    queryField,
    mapTypes,
  };
};
