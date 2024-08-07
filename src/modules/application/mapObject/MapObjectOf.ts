import { Result } from '@/modules/system/result/Result';
import { ResultValuableParam } from '@/modules/system/result/ResultValuable';
import { MapObject } from '@/modules/application/mapObject/MapObject';
import { ResultOf } from '@/modules/system/result/ResultOf';

/**
 * Конвертация структура объекта карты в объект
 */
export class MapObjectOf implements MapObject {
  private mapObject: Result<ResultValuableParam<MapObject>>;

  public constructor(mapStructure: ResultValuableParam<MapObject>) {
    this.mapObject = new ResultOf(mapStructure);
  }

  public value() {
    return this.mapObject;
  }
}
