import { MapDocument, MapSettingsDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { Guest } from '@/modules/system/guest/Guest';
import { GuestType } from '@/modules/system/guest/GuestType';

export class MapSettingsGuest implements GuestType<MapSettingsDocument> {
  public constructor(private mapFile: MapFileType, private map: MapType) {}

  public receive(newSettings: MapSettingsDocument): this {
    this.mapFile.currentMap(new Guest((latestMapDocument: MapDocument) => {
      this.map.receive({
        ...latestMapDocument,
        settings: newSettings,
      });
    }));
    return this;
  }
}
