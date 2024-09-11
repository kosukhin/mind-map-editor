import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import {
  MapDocument,
  MapFileDocument,
  MapObjectDocument,
  MapSettingsDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { debug } from 'debug';
import { GuestType } from '@/modules/system/guest/GuestType';
import { InstanceType } from '@/modules/system/guest/InstanceType';
import { CacheType } from '@/modules/system/guest/CacheType';

const localDebug = debug('MapCurrent');

export class MapCurrent implements MapType {
  private mapObjectsCache: CacheType<MapObjectDocument[]>;

  private mapSettingsCache: CacheType<MapSettingsDocument>;

  public constructor(
    private mapFile: MapFileType,
    cache: InstanceType<CacheType<unknown>>,
    private guest: InstanceType<GuestType<unknown>>,
    private patron: InstanceType<GuestType<unknown>>,
  ) {
    this.mapObjectsCache = cache.create(this);
    this.mapSettingsCache = cache.create(this);
    mapFile.currentMap(patron.create(guest.create((latestMap: MapDocument) => {
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
    this.mapFile.mapFile(this.guest.create((latestMapFile: MapFileDocument) => {
      this.mapFile.receive({
        ...latestMapFile,
        [name]: value,
      });
    }));
    return this;
  }
}
