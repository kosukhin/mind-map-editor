import { ResultOf } from '@/modules/system/result/ResultOf';
import { ResultValuableParam } from '@/modules/system/result/ResultValuable';
import { MapSettings } from '@/modules/application/mapSettings/MapSettings';

/**
 * Конвертация структуры настроек карты в объект
 */
export class MapSettingsNull implements MapSettings {
  private mapObject = new ResultOf<ResultValuableParam<MapSettings>>(null);

  public value() {
    return this.mapObject;
  }
}
