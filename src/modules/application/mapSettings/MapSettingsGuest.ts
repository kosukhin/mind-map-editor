import { Guest } from '@/modules/system/guest/Guest';
import { MapDocument, MapSettingsDocument } from '@/modules/entities/MapStructures';
import { MapFile } from '@/modules/application/mapFile/MapFile';
import { Map } from '@/modules/application/map/Map';
import { GuestDynamic } from '@/modules/system/guest/GuestDynamic';

export class MapSettingsGuest implements Guest<MapSettingsDocument> {
  public constructor(private mapFile: MapFile, private map: Map) {}

  public introduction() {
    return 'guest' as const;
  }

  public receive(newSettings: MapSettingsDocument): this {
    this.mapFile.currentMap(new GuestDynamic((latestMapDocument: MapDocument) => {
      console.log('send map changed');
      this.map.receive({
        ...latestMapDocument,
        settings: newSettings,
      });
    }));
    return this;
  }
}
