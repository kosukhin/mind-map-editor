import { ref } from '@vue/reactivity';
import { clone } from 'lodash';
import { modelsPoolGet } from '@/modulesHigh/models/modelsPool';
import { MapStructure } from '@/entities/Map';
import { mapMutator } from '@/modules/map/mapMutator';
import { objectHelper } from '@/modules/common/objectHelper';
import { computed } from 'vue';

// Feature what can save searches with names inside map
export const useSearchNamed = () => {
  const namedSearchFormShowed = ref(false);
  const namedSearchForm = ref({
    name: '',
    query: '',
    type: '',
  });
  const namedSearches = computed(() => {
    const map = modelsPoolGet<MapStructure>('map');
    return map.namedSearches ?? [];
  });
  const namedSearchSave = () => {
    const map = modelsPoolGet<MapStructure>('map');
    mapMutator.addNamedSearch(map, clone(namedSearchForm.value));
    objectHelper.setValues(namedSearchForm.value, {
      '*': '',
    });
    namedSearchFormShowed.value = false;
  };

  const namedSearchRemoveByIndex = (index: number) => {
    const map = modelsPoolGet<MapStructure>('map');
    map.namedSearches?.splice(index, 1);
  };

  return {
    namedSearches,
    namedSearchFormShowed,
    namedSearchForm,
    namedSearchSave,
    namedSearchRemoveByIndex,
  };
};
