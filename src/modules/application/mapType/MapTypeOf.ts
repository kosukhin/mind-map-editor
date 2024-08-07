import { ResultOf } from '@/modules/system/result/ResultOf';
import { ResultValuableParam } from '@/modules/system/result/ResultValuable';
import { MapType } from '@/modules/application/mapType/MapType';
import { Result } from '@/modules/system/result/Result';

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
