import { Result } from '@/modules/system/result/Result';
import { ResultValuableParam } from '@/modules/system/result/ResultValuable';
import { MapSettings } from '@/modules/application/mapSettings/MapSettings';
import { ResultOf } from '@/modules/system/result/ResultOf';

/**
 * Конвертация структуры настроек карты в объект
 */
export class MapSettingsOf implements MapSettings {
  private mapObject: Result<ResultValuableParam<MapSettings>>;

  public constructor(mapStructure: ResultValuableParam<MapSettings>) {
    this.mapObject = new ResultOf(mapStructure);
  }

  public value() {
    return this.mapObject;
  }
}
