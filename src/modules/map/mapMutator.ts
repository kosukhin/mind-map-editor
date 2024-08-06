import { MapStructure, MapTypeStructure, NamedSearchStructure } from '@/objects/entities/MapStructures';

export const mapMutator = {
  addType(map: MapStructure, type: MapTypeStructure) {
    map.types[type.name] = type;
  },
  addNamedSearch(map: MapStructure, search: NamedSearchStructure) {
    if (!map.namedSearches) {
      map.namedSearches = [];
    }

    map.namedSearches.push(search);
  },
};
