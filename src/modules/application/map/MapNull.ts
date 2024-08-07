import { ResultOf } from '@/modules/system/result/ResultOf';
import { ResultValuableParam } from '@/modules/system/result/ResultValuable';
import { Map } from '@/modules/application/map/Map';

/**
 * Нулевой объект карты
 */
export class MapNull implements Map {
  private map = new ResultOf<ResultValuableParam<Map>>(null);

  public value() {
    return this.map;
  }
}
