import { Map } from '@/modules/application/map/Map';
import { Guest } from '@/modules/system/guest/Guest';
import {
  MapDocument,
  MapFileDocument,
  MapObjectDocument,
  MapSettingsDocument,
} from '@/modules/entities/MapStructures';
import { MapFile } from '@/modules/application/mapFile/MapFile';
import { Visitant } from '@/modules/system/guest/Visitant';
import { Value } from '@/modules/system/guest/Value';
import { Patron } from '@/modules/system/guest/Patron';

export class MapCurrent implements Map {
  private theMapSettings = new Value({}, this);

  private theMapObjects = new Value<MapObjectDocument[]>([], this);

  public constructor(private mapFile: MapFile) {
    mapFile.currentMap(new Patron(new Visitant((latestMap: MapDocument) => {
      this.theMapSettings.receive(latestMap.settings);
      this.theMapObjects.receive(Object.values(latestMap.objects));
    })));
  }

  public mapSettings(guest: Guest<MapSettingsDocument>) {
    this.theMapSettings.receiving(guest);
    return this;
  }

  public mapObjects(guest: Guest<MapObjectDocument[]>) {
    this.theMapObjects.receiving(guest);
    return this;
  }

  public receive(value: MapDocument) {
    // TODO тут временно current позже нужен объект Text которые будет представлять имя из ссылки
    const name = 'current';
    this.mapFile.mapFile(new Visitant((latestMapFile: MapFileDocument) => {
      this.mapFile.receive({
        ...latestMapFile,
        [name]: value,
      });
    }));
    return this;
  }
}
