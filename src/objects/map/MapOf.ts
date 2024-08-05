import { BaseResult } from '@/objects/base/BaseResult';
import { BaseResultParam } from '@/objects/base/BaseResultEntity';
import { Map } from '@/objects/map/Map';

/**
 * Конвертация структуры данных карты в объект
 */
export class MapOf implements Map {
  private canvas: BaseResult<BaseResultParam<Map>>;

  public constructor(mapStructure: BaseResultParam<Map>) {
    this.canvas = new BaseResult(mapStructure);
  }

  public entity() {
    return this.canvas;
  }
}
