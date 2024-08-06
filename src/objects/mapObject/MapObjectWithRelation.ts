import { MapObjectRelationStructure, MapObjectStructure } from '@/entities/MapStructures';
import { BaseResult } from '@/objects/base/BaseResult';
import { MapObject } from '@/objects/mapObject/MapObject';

/**
 * Представление Объекта карты с связью с другим объектом
 */
export class MapObjectWithRelation implements MapObject {
  public constructor(private parent: MapObject, private relation: MapObjectRelationStructure) {
  }

  public entity(): BaseResult<MapObjectStructure> {
    const objectStructure = this.entity().result();
    const arrows = [...objectStructure.arrows, this.relation];
    return new BaseResult({
      ...objectStructure,
      arrows,
    });
  }
}
