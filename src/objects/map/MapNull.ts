import { BaseResult } from '@/objects/base/BaseResult';
import { BaseResultParam } from '@/objects/base/BaseResultEntity';
import { Map } from '@/objects/map/Map';

/**
 * Нулевой объект карты
 */
export class MapNull implements Map {
  private map = new BaseResult<BaseResultParam<Map>>(null);

  public entity() {
    return this.map;
  }
}
