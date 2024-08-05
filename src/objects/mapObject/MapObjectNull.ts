import { BaseResult } from '@/objects/base/BaseResult';
import { BaseResultParam } from '@/objects/base/BaseResultEntity';
import { MapObject } from '@/objects/mapObject/MapObject';

/**
 * Конвертация структура объекта карты в объект
 */
export class MapObjectNull implements MapObject {
  private mapObject = new BaseResult<BaseResultParam<MapObject>>(null);

  public entity() {
    return this.mapObject;
  }
}
