import { Result } from '@/objects/system/result/Result';
import { ResultValuableParam } from '@/objects/system/result/ResultValuable';
import { MapSettings } from '@/objects/application/mapSettings/MapSettings';
import { ResultOf } from '@/objects/system/result/ResultOf';

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
