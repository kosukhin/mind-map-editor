import { MapStructure } from '@/modules/entities/MapStructures';
import { ResultObservableOf } from '@/modules/system/result/ResultObservableOf';

/**
 * Нулевой объект карты
 */
export class MapNull extends ResultObservableOf<MapStructure> {
  constructor() {
    super(null);
  }
}
