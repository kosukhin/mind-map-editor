import { Result } from '@/objects/system/result/Result';
import { ResultValuableParam } from '@/objects/system/result/ResultValuable';
import { Map } from '@/objects/application/map/Map';
import { ResultOf } from '@/objects/system/result/ResultOf';

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
