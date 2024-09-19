import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import {
  MapDocument,
  MapFileDocument,
  MapObjectDocument,
  MapSettingsDocument, MapTypeDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { debug } from 'debug';
import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { CacheType } from '@/modules/system/guest/CacheType';

const localDebug = debug('MapCurrent');

/**
 * Объект для получения основных частей карты - объекты, типы, настройки.
 * и для сохранения карты.
 */
export class MapCurrent implements MapType {
  private objectsCache: CacheType<MapObjectDocument[]>;

  private settingsCache: CacheType<MapSettingsDocument>;

  private typesCache: CacheType<MapTypeDocument[]>;

  public constructor(
    private mapFile: MapFileType,
    private factories: {
      cache: FactoryType<CacheType>,
      guest: FactoryType<GuestType>,
      patron: FactoryType<GuestType>,
    },
  ) {
    this.objectsCache = factories.cache.create(this);
    this.settingsCache = factories.cache.create(this);
    this.typesCache = factories.cache.create(this);
    mapFile.currentMap(factories.patron.create(factories.guest.create((latestMap: MapDocument) => {
      localDebug('current map changed', latestMap);
      this.settingsCache.receive(latestMap.settings);
      this.objectsCache.receive(Object.values(latestMap.objects));
      this.typesCache.receive(Object.values(latestMap.types));
    })));
  }

  public settings<R extends GuestType<MapSettingsDocument>>(guest: R) {
    this.settingsCache.receiving(guest);
    return guest;
  }

  public objects<R extends GuestType<MapObjectDocument[]>>(guest: R) {
    localDebug('notify about new objects');
    this.objectsCache.receiving(guest);
    return guest;
  }

  public types<R extends GuestType<MapTypeDocument[]>>(guest: R) {
    this.typesCache.receiving(guest);
    return guest;
  }

  public receive(value: MapDocument) {
    localDebug('save map document', value);
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
