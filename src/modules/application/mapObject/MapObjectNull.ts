import { MapObject } from '@/modules/application/mapObject/MapObject';
import { MapObjectStructure } from '@/modules/entities/MapStructures';
import { ResultObservableOf } from '@/modules/system/result/ResultObservableOf';

/**
 * Конвертация структура объекта карты в объект
 */
export class MapObjectNull extends ResultObservableOf<MapObjectStructure> implements MapObject {
  constructor() {
    super(null);
  }
}
