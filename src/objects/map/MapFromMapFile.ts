import { MapStructure } from '@/entities/MapStructures';
import { BaseResult } from '@/objects/base/BaseResult';
import { Map } from '@/objects/map/Map';

/**
 * Синхронизация MapFile объекта с Map
 */
export class MapFromMapFile implements Map {
  entity(): BaseResult<MapStructure> {
    throw new Error('Method not implemented.');
  }
}
