import {
  MapDocument,
  MapSettingsDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';

export class MapSettings implements GuestType<MapSettingsDocument> {
  public constructor(
    private mapFile: MapFileType,
    private map: MapType,
    private factories: {
      guest: FactoryType<GuestType>,
    },
  ) {}

  public receive(newSettings: MapSettingsDocument): this {
    this.mapFile.currentMap(this.factories.guest.create((latestMapDocument: MapDocument) => {
      this.map.receive({
        ...latestMapDocument,
        settings: newSettings,
      });
    }));
    return this;
  }
}
