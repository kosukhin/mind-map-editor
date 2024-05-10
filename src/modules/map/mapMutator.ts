import { MapStructure, MapType } from '@/entities/Map';
import { modelsPoolGet } from '@/modulesHigh/models/modelsPool';

export const mapMutator = {
  addType(type: MapType) {
    const map = modelsPoolGet<MapStructure>('map');
    map.types[type.name] = type;
  },
};
