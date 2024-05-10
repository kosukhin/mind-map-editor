import { mapMutator } from '@/modules/map/mapMutator';
import { MapStructure, MapType } from '@/entities/Map';
import { modelsPoolGet } from '@/modulesHigh/models/modelsPool';

/**
 * Типы узлов заранее заданные в приложении
 */
export const useMapPresets = () => ({
  addType(type: MapType) {
    const map = modelsPoolGet<MapStructure>('map');
    mapMutator.addType(map, type);
  },
});
