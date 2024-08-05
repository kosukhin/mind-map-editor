import { MapObjectStructure } from '@/entities/MapStructures';
import { BaseChannel } from '@/objects/base/BaseChannel';
import { MapObject } from '@/objects/mapObject/MapObject';

/**
 * Представление Объекта карты с связью с другим объектом
 */
export class MapObjectWithRelation implements MapObject {
  channel(): BaseChannel<MapObjectStructure> {
    throw new Error('Method not implemented.');
  }

  entity(): MapObjectStructure {
    throw new Error('Method not implemented.');
  }
}
