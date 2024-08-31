import { Map } from '@/modules/application/map/Map';
import {
  MapDocument,
  MapFileDocument,
  MapObjectDocument,
  MapSettingsDocument,
} from '@/modules/entities/MapStructures';
import { MapFile } from '@/modules/application/mapFile/MapFile';
import { Guest } from '@/modules/system/guest/Guest';
import { Cache } from '@/modules/system/guest/Cache';
import { Patron } from '@/modules/system/guest/Patron';
import { GuestType } from '../../system/guest/GuestType';

export class MapCurrent implements Map {
  private mapSettingsCache = new Cache(this);

  private mapObjectsCache = new Cache<MapObjectDocument[]>(this);

  public constructor(private mapFile: MapFile) {
    mapFile.currentMap(new Patron(new Guest((latestMap: MapDocument) => {
      this.mapSettingsCache.receive(latestMap.settings);
      this.mapObjectsCache.receive(Object.values(latestMap.objects));
    })));
  }

  public mapSettings(guest: GuestType<MapSettingsDocument>) {
    this.mapSettingsCache.receiving(guest);
    return this;
  }

  public mapObjects(guest: GuestType<MapObjectDocument[]>) {
    this.mapObjectsCache.receiving(guest);
    return this;
  }

  public receive(value: MapDocument) {
    // TODO тут временно current позже нужен объект Text которые будет представлять имя из ссылки
    const name = 'current';
    this.mapFile.mapFile(new Guest((latestMapFile: MapFileDocument) => {
      this.mapFile.receive({
        ...latestMapFile,
        [name]: value,
      });
    }));
    return this;
  }
}
