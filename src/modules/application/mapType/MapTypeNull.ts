import { MapTypeStructure } from '@/modules/entities/MapStructures';
import { ResultObservableOf } from '@/modules/system/result/ResultObservableOf';

/**
 * Конвертация структуры типа карты в объект
 */
export class MapTypeNull extends ResultObservableOf<MapTypeStructure> {
  constructor() {
    super(null);
  }
}
