import { MapSettingsStructure } from '@/entities/MapStructures';
import { BaseChannel } from '@/objects/base/BaseChannel';
import { BaseChannelOf } from '@/objects/base/BaseChannelOf';
import { MapSettings } from '@/objects/mapSettings/MapSettings';

/**
 * Конвертация структуры настроек карты в объект
 */
export class MapSettingsOf implements MapSettings {
  private innerChannel = new BaseChannelOf<MapSettingsStructure>()

  constructor(private mapSettingsStructure: MapSettingsStructure) {}

  public channel(): BaseChannel<MapSettingsStructure> {
    return this.innerChannel;
  }

  public entity(): MapSettingsStructure {
    return this.mapSettingsStructure;
  }
}
