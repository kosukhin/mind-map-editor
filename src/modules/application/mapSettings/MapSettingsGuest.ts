import { Guest } from '@/modules/system/guest/Guest';
import { MapDocument, MapSettingsDocument } from '@/modules/entities/MapStructures';
import { MapFile } from '@/modules/application/mapFile/MapFile';
import { Map } from '@/modules/application/map/Map';
import { Visitant } from '@/modules/system/guest/Visitant';

export class MapSettingsGuest implements Guest<MapSettingsDocument> {
  public constructor(private mapFile: MapFile, private map: Map) {}

  public receive(newSettings: MapSettingsDocument): this {
    this.mapFile.currentMap(new Visitant((latestMapDocument: MapDocument) => {
      console.log('send map changed');
      this.map.receive({
        ...latestMapDocument,
        settings: newSettings,
      });
    }));
    return this;
  }
}
