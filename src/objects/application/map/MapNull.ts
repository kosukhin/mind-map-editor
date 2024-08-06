import { ResultOf } from '@/objects/system/result/ResultOf';
import { ResultValuableParam } from '@/objects/system/result/ResultValuable';
import { Map } from '@/objects/application/map/Map';

/**
 * Нулевой объект карты
 */
export class MapNull implements Map {
  private map = new ResultOf<ResultValuableParam<Map>>(null);

  public value() {
    return this.map;
  }
}
