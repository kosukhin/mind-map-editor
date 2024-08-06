import { Result } from '@/objects/system/result/Result';
import { ResultValuableParam } from '@/objects/system/result/ResultValuable';
import { MapObject } from '@/objects/application/mapObject/MapObject';
import { ResultOf } from '@/objects/system/result/ResultOf';

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
