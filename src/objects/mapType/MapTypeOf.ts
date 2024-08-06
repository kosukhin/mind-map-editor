import { BaseResult } from '@/objects/base/BaseResult';
import { BaseResultParam } from '@/objects/base/BaseResultEntity';
import { MapType } from '@/objects/mapType/MapType';

/**
 * Конвертация структуры типа карты в объект
 */
export class MapTypeOf implements MapType {
  private mapType: BaseResult<BaseResultParam<MapType>>;

  public constructor(mapType: BaseResultParam<MapType>) {
    this.mapType = new BaseResult(mapType);
  }

  public entity() {
    return this.mapType;
  }
}
