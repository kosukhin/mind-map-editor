import { BaseResult } from '@/objects/base/BaseResult';
import { BaseResultParam } from '@/objects/base/BaseResultEntity';
import { MapType } from '@/objects/mapType/MapType';

/**
 * Конвертация структуры типа карты в объект
 */
export class MapTypeNull implements MapType {
  private mapObject = new BaseResult<BaseResultParam<MapType>>(null);

  public entity() {
    return this.mapObject;
  }
}
