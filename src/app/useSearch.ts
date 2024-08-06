import { ref } from '@vue/reactivity';
import { computed } from 'vue';
import { modelsPoolGet } from '@/modulesHigh/models/modelsPool';
import { mapTransformer } from '@/modules/map/mapTransformer';
import { MapObjectStructure, MapStructure } from '@/objects/entities/MapStructures';
import { listItemAny } from '@/modules/common/constants';
import { branchCombinator } from '@/modules/combinators/branchCombinator';
import { mapObjectTransformer } from '@/modules/map/mapObjectTransformer';
import { stringHelper } from '@/modules/common/stringHelper';
import { arrayHelper } from '@/modules/common/arrayHelper';

const { isIncludesInField, isIncludesInAdditionalFields } = mapObjectTransformer;
const { when } = branchCombinator;

// Ability to search by map
export const useSearch = () => {
  const typeField = ref<string | null>(null);
  const queryField = ref('');
  const isSearchedAnything = computed(
    () => typeField.value || queryField.value,
  );

  const mapTypes = computed(() => {
    const map = modelsPoolGet<MapStructure>('map');
    return [
      listItemAny,
      ...mapTransformer.typesList(map),
    ];
  });

  const searchResults = computed(() => {
    const map = modelsPoolGet<MapStructure>('map');
    const allObjects = mapTransformer.getObjects(map);
    let objects: MapObjectStructure[] = when(typeField.value, () => mapObjectTransformer.filterObjectsByType(
      allObjects,
      typeField.value as string,
    ), allObjects);

    objects = when(queryField.value, () => {
      const searchQuery = stringHelper.toLower(queryField.value);
      return arrayHelper.filter(
        objects,
        (object: MapObjectStructure) => isIncludesInAdditionalFields(object, searchQuery)
        || isIncludesInField(object, 'name', searchQuery)
        || isIncludesInField(object, 'additionalName', searchQuery),
      );
    }, objects);

    return objects;
  });

  return {
    typeField,
    queryField,
    isSearchedAnything,
    mapTypes,
    searchResults,
  };
};
