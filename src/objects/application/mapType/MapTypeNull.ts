import { ResultOf } from '@/objects/system/result/ResultOf';
import { ResultValuableParam } from '@/objects/system/result/ResultValuable';
import { MapType } from '@/objects/application/mapType/MapType';

/**
 * Конвертация структуры типа карты в объект
 */
export class MapTypeNull implements MapType {
  private mapObject = new ResultOf<ResultValuableParam<MapType>>(null);

  public value() {
    return this.mapObject;
  }
}
