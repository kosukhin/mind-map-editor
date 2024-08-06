import { BaseResult } from '@/objects/base/BaseResult';
import { BaseResultParam } from '@/objects/base/BaseResultEntity';
import { MapObject } from '@/objects/mapObject/MapObject';

/**
 * Конвертация структура объекта карты в объект
 */
export class MapObjectOf implements MapObject {
  private mapObject: BaseResult<BaseResultParam<MapObject>>;

  public constructor(mapStructure: BaseResultParam<MapObject>) {
    this.mapObject = new BaseResult(mapStructure);
  }

  public entity() {
    return this.mapObject;
  }
}
