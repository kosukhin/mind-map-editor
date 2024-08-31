import { MapDocument, MapSettingsDocument } from '@/modules/entities/MapStructures';
import { MapFile } from '@/modules/application/mapFile/MapFile';
import { Map } from '@/modules/application/map/Map';
import { Guest } from '@/modules/system/guest/Guest';
import { GuestType } from '../../system/guest/GuestType';

export class MapSettingsGuest implements GuestType<MapSettingsDocument> {
  public constructor(private mapFile: MapFile, private map: Map) {}

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
