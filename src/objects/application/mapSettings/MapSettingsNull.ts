import { ResultOf } from '@/objects/system/result/ResultOf';
import { ResultValuableParam } from '@/objects/system/result/ResultValuable';
import { MapSettings } from '@/objects/application/mapSettings/MapSettings';

/**
 * Конвертация структуры настроек карты в объект
 */
export class MapSettingsNull implements MapSettings {
  private mapObject = new ResultOf<ResultValuableParam<MapSettings>>(null);

  public value() {
    return this.mapObject;
  }
}
