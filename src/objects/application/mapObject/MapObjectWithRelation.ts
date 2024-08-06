import { MapObjectRelationStructure, MapObjectStructure } from '@/objects/entities/MapStructures';
import { Result } from '@/objects/system/result/Result';
import { MapObject } from '@/objects/application/mapObject/MapObject';
import { ResultOf } from '@/objects/system/result/ResultOf';

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
