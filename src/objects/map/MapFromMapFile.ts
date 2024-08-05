import { MapStructure } from '@/entities/MapStructures';
import { BaseChannel } from '@/objects/base/BaseChannel';
import { Map } from '@/objects/map/Map';

/**
 * Синхронизация MapFile объекта с Map
 */
export class MapFromMapFile implements Map {
  channel(): BaseChannel<MapStructure> {
    throw new Error('Method not implemented.');
  }

  entity(): MapStructure {
    throw new Error('Method not implemented.');
  }
}
