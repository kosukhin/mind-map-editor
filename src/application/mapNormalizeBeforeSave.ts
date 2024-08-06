import { MapStructure } from '@/objects/entities/MapStructures';

export const mapNormalizeBeforeSave = (
  vMap: MapStructure,
  currentLocation: string,
) => ({ ...vMap, url: currentLocation });
