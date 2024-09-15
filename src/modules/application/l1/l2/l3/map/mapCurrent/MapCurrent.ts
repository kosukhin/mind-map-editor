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
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { CacheType } from '@/modules/system/guest/CacheType';

const localDebug = debug('MapCurrent');

export class MapCurrent implements MapType {
  private mapObjectsCache: CacheType<MapObjectDocument[]>;

  private mapSettingsCache: CacheType<MapSettingsDocument>;

  public constructor(
    private mapFile: MapFileType,
    private factories: {
      cache: FactoryType<CacheType>,
      guest: FactoryType<GuestType>,
      patron: FactoryType<GuestType>,
    },
  ) {
    this.mapObjectsCache = factories.cache.create(this);
    this.mapSettingsCache = factories.cache.create(this);
    mapFile.currentMap(factories.patron.create(factories.guest.create((latestMap: MapDocument) => {
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
    this.mapFile.mapFile(this.factories.guest.create((latestMapFile: MapFileDocument) => {
      this.mapFile.receive({
        ...latestMapFile,
        [name]: value,
      });
    }));
    return this;
  }
}
