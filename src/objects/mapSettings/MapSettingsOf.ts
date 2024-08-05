import { MapSettingsStructure } from '@/entities/MapStructures';
import { BaseChannel } from '@/objects/base/BaseChannel';
import { MapSettings } from '@/objects/mapSettings/MapSettings';

/**
 * Конвертация структуры настроек карты в объект
 */
export class MapSettingsOf implements MapSettings {
  channel(): BaseChannel<MapSettingsStructure> {
    throw new Error('Method not implemented.');
  }

  entity(): MapSettingsStructure {
    throw new Error('Method not implemented.');
  }
}
