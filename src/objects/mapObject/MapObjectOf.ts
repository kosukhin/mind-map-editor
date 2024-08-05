import { MapObjectStructure } from '@/entities/MapStructures';
import { BaseChannel } from '@/objects/base/BaseChannel';
import { MapObject } from '@/objects/mapObject/MapObject';

/**
 * Конвертация структура объекта карты в объект
 */
export class MapObjectOf implements MapObject {
  channel(): BaseChannel<MapObjectStructure> {
    throw new Error('Method not implemented.');
  }

  entity(): MapObjectStructure {
    throw new Error('Method not implemented.');
  }
}
