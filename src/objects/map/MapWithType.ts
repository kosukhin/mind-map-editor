import { MapStructure } from '@/entities/MapStructures';
import { BaseResult } from '@/objects/base/BaseResult';
import { Map } from '@/objects/map/Map';

/**
 * Связь карты и типа карты
 */
export class MapWithType implements Map {
  entity(): BaseResult<MapStructure> {
    throw new Error('Method not implemented.');
  }
}
