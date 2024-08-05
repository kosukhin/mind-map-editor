import { MapObjectStructure } from '@/entities/MapStructures';
import { BaseResult } from '@/objects/base/BaseResult';
import { MapObject } from '@/objects/mapObject/MapObject';

/**
 * Представление Объекта карты с связью с другим объектом
 */
export class MapObjectWithRelation implements MapObject {
  entity(): BaseResult<MapObjectStructure> {
    throw new Error('Method not implemented.');
  }
}
