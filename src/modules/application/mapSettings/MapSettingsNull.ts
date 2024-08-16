import { MapSettingsStructure } from '@/modules/entities/MapStructures';
import { ResultObservableOf } from '@/modules/system/result/ResultObservableOf';

/**
 * Конвертация структуры настроек карты в объект
 */
export class MapSettingsNull extends ResultObservableOf<MapSettingsStructure> {
  constructor() {
    super(null);
  }
}
