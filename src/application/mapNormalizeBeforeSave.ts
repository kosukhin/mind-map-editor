import { MapStructure } from '@/entities/Map';

export const mapNormalizeBeforeSave = (
  vMap: MapStructure,
  currentLocation: string,
) => ({ ...vMap, url: currentLocation });
