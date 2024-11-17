import {
  MapDocument,
  MapSettingsDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { FactoryType, GuestObjectType } from 'patron-oop';

/**
 * Объект для сохранения настроек карты
 */
export class MapSettings implements GuestObjectType<MapSettingsDocument> {
  public constructor(
    private mapFile: MapFileType,
    private map: MapType,
    private factories: {
      guest: FactoryType<GuestObjectType>,
    },
  ) {}

  public give(newSettings: MapSettingsDocument): this {
    this.mapFile.currentMap(this.factories.guest.create((latestMapDocument: MapDocument) => {
      this.map.give({
        ...latestMapDocument,
        settings: newSettings,
      });
    }));
    return this;
  }
}
