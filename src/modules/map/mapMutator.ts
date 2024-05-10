import { MapStructure, MapType, NamedSearch } from '@/entities/Map';

export const mapMutator = {
  addType(map: MapStructure, type: MapType) {
    map.types[type.name] = type;
  },
  addNamedSearch(map: MapStructure, search: NamedSearch) {
    if (!map.namedSearches) {
      map.namedSearches = [];
    }

    map.namedSearches.push(search);
  },
};
