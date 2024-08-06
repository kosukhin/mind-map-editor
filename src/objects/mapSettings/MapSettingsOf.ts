import { BaseResult } from '@/objects/base/BaseResult';
import { BaseResultParam } from '@/objects/base/BaseResultEntity';
import { MapSettings } from '@/objects/mapSettings/MapSettings';

/**
 * Конвертация структуры настроек карты в объект
 */
export class MapSettingsOf implements MapSettings {
  private mapObject: BaseResult<BaseResultParam<MapSettings>>;

  public constructor(mapStructure: BaseResultParam<MapSettings>) {
    this.mapObject = new BaseResult(mapStructure);
  }

  public entity() {
    return this.mapObject;
  }
}
