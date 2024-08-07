import { ResultOf } from '@/modules/system/result/ResultOf';
import { ResultValuableParam } from '@/modules/system/result/ResultValuable';
import { MapObject } from '@/modules/application/mapObject/MapObject';

/**
 * Конвертация структура объекта карты в объект
 */
export class MapObjectNull implements MapObject {
  private mapObject = new ResultOf<ResultValuableParam<MapObject>>(null);

  public value() {
    return this.mapObject;
  }
}
