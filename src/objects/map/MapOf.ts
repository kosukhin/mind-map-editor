import { MapStructure } from '@/entities/MapStructures';
import { BaseChannel } from '@/objects/base/BaseChannel';
import { Map } from '@/objects/map/Map';

/**
 * Конвертация структура данных карты в объект
 */
export class MapOf implements Map {
  channel(): BaseChannel<MapStructure> {
    throw new Error('Method not implemented.');
  }

  entity(): MapStructure {
    throw new Error('Method not implemented.');
  }
}
