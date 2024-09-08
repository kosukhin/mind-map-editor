import { MapType } from '@/modules/application/map/MapType';
import {
  MapDocument,
  MapFileDocument,
  MapObjectDocument,
  MapSettingsDocument,
} from '@/modules/entities/MapStructures';
import { MapFileType } from '@/modules/application/mapFile/MapFileType';
import { Guest } from '@/modules/system/guest/Guest';
import { Cache } from '@/modules/system/guest/Cache';
import { Patron } from '@/modules/system/guest/Patron';
import { debug } from 'debug';
import { GuestType } from '../../system/guest/GuestType';

const localDebug = debug('MapCurrent');

export class MapCurrent implements MapType {
  private mapObjectsCache = new Cache<MapObjectDocument[]>(this);

  private mapSettingsCache = new Cache(this);

  public constructor(
    private mapFile: MapFileType,
  ) {
    mapFile.currentMap(new Patron(new Guest((latestMap: MapDocument) => {
      localDebug('current map changed');
      this.mapSettingsCache.receive(latestMap.settings);
      this.mapObjectsCache.receive(Object.values(latestMap.objects));
    })));
  }

  public mapSettings(guest: GuestType<MapSettingsDocument>) {
    this.mapSettingsCache.receiving(guest);
    return this;
  }

  public mapObjects(guest: GuestType<MapObjectDocument[]>) {
    localDebug('notify about new objects');
    this.mapObjectsCache.receiving(guest);
    return this;
  }

  public receive(value: MapDocument) {
    localDebug('save map document', value);
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
