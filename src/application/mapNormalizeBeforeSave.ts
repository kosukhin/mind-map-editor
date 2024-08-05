import { MapStructure } from '@/entities/MapStructures';

export const mapNormalizeBeforeSave = (
  vMap: MapStructure,
  currentLocation: string,
) => ({ ...vMap, url: currentLocation });
