import { mapMutator } from '@/modules/map/mapMutator';
import { MapStructure, MapType } from '@/entities/Map';
import { modelsPoolGet } from '@/modulesHigh/models/modelsPool';

/**
 * MapTypes included in application as presets
 */
export const useMapPresets = () => ({
  addType(type: MapType) {
    const map = modelsPoolGet<MapStructure>('map');
    mapMutator.addType(map, type);
  },
});
