import { MapStructure, MapType } from '@/entities/Map';

export const mapMutator = {
  addType(map: MapStructure, type: MapType) {
    map.types[type.name] = type;
  },
};
