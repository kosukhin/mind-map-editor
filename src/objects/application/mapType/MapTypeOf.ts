import { ResultOf } from '@/objects/system/result/ResultOf';
import { ResultValuableParam } from '@/objects/system/result/ResultValuable';
import { MapType } from '@/objects/application/mapType/MapType';
import { Result } from '@/objects/system/result/Result';

/**
 * Конвертация структуры типа карты в объект
 */
export class MapTypeOf implements MapType {
  private mapType: Result<ResultValuableParam<MapType>>;

  public constructor(mapType: ResultValuableParam<MapType>) {
    this.mapType = new ResultOf(mapType);
  }

  public value() {
    return this.mapType;
  }
}
