import { Result } from '@/modules/system/result/Result';
import { ResultValuableParam } from '@/modules/system/result/ResultValuable';
import { Map } from '@/modules/application/map/Map';
import { ResultOf } from '@/modules/system/result/ResultOf';

/**
 * Конвертация структуры данных карты в объект
 */
export class MapOf implements Map {
  private canvas: Result<ResultValuableParam<Map>>;

  public constructor(mapStructure: ResultValuableParam<Map>) {
    this.canvas = new ResultOf(mapStructure);
  }

  public value() {
    return this.canvas;
  }
}
