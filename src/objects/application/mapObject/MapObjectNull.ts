import { ResultOf } from '@/objects/system/result/ResultOf';
import { ResultValuableParam } from '@/objects/system/result/ResultValuable';
import { MapObject } from '@/objects/application/mapObject/MapObject';

/**
 * Конвертация структура объекта карты в объект
 */
export class MapObjectNull implements MapObject {
  private mapObject = new ResultOf<ResultValuableParam<MapObject>>(null);

  public value() {
    return this.mapObject;
  }
}
