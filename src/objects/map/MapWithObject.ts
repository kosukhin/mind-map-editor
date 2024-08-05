import { MapStructure } from '@/entities/MapStructures';
import { BaseResult } from '@/objects/base/BaseResult';
import { Map } from '@/objects/map/Map';

/**
 * Связь карты и объекта карты
 */
export class MapWithObject implements Map {
  entity(): BaseResult<MapStructure> {
    throw new Error('Method not implemented.');
  }
}
