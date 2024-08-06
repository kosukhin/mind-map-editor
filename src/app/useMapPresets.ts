import { mapMutator } from '@/modules/map/mapMutator';
import { MapStructure, MapTypeStructure } from '@/objects/entities/MapStructures';
import { modelsPoolGet } from '@/modulesHigh/models/modelsPool';

/**
 * MapTypes included in application as presets
 */
export const useMapPresets = () => ({
  addType(type: MapTypeStructure) {
    const map = modelsPoolGet<MapStructure>('map');
    mapMutator.addType(map, type);
  },
});
