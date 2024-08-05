import { BaseResult } from '@/objects/base/BaseResult';
import { BaseResultParam } from '@/objects/base/BaseResultEntity';
import { MapSettings } from '@/objects/mapSettings/MapSettings';

/**
 * Конвертация структуры настроек карты в объект
 */
export class MapSettingsNull implements MapSettings {
  private mapObject = new BaseResult<BaseResultParam<MapSettings>>(null);

  public entity() {
    return this.mapObject;
  }
}
