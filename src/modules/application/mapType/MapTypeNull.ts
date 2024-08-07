import { ResultOf } from '@/modules/system/result/ResultOf';
import { ResultValuableParam } from '@/modules/system/result/ResultValuable';
import { MapType } from '@/modules/application/mapType/MapType';

/**
 * Конвертация структуры типа карты в объект
 */
export class MapTypeNull implements MapType {
  private mapObject = new ResultOf<ResultValuableParam<MapType>>(null);

  public value() {
    return this.mapObject;
  }
}
