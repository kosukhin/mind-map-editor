import { MapObjectRelationStructure, MapObjectStructure } from '@/modules/entities/MapStructures';
import { Result } from '@/modules/system/result/Result';
import { MapObject } from '@/modules/application/mapObject/MapObject';
import { ResultOf } from '@/modules/system/result/ResultOf';

/**
 * Представление Объекта карты с связью с другим объектом
 */
export class MapObjectWithRelation implements MapObject {
  public constructor(private parent: MapObject, private relation: MapObjectRelationStructure) {
  }

  public value(): Result<MapObjectStructure> {
    const objectStructure = this.value().result();
    const arrows = [...objectStructure.arrows, this.relation];
    return new ResultOf({
      ...objectStructure,
      arrows,
    });
  }
}
