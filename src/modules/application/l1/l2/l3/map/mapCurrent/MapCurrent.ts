import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import {
  MapDocument,
  MapFileDocument,
  MapObjectDocument,
  MapSettingsDocument, MapTypeDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { debug } from 'debug';
import { GuestObjectType, FactoryType, SourceType } from 'patron-oop';
import { MapCurrentIDType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentIDType';

const localDebug = debug('MapCurrent');

/**
 * Объект для получения основных частей карты - объекты, типы, настройки.
 * и для сохранения карты.
 */
export class MapCurrent implements MapType {
  private objectsCache: SourceType<MapObjectDocument[]>;

  private settingsCache: SourceType<MapSettingsDocument>;

  private typesCache: SourceType<MapTypeDocument[]>;

  public constructor(
    private mapFile: MapFileType,
    private mapId: MapCurrentIDType,
    private factories: {
      sourceEmpty: FactoryType<SourceType>,
      guest: FactoryType<GuestObjectType>,
      patron: FactoryType<GuestObjectType>,
    },
  ) {
    this.objectsCache = factories.sourceEmpty.create();
    this.settingsCache = factories.sourceEmpty.create();
    this.typesCache = factories.sourceEmpty.create();
    mapFile.currentMap(factories.patron.create(factories.guest.create((latestMap: MapDocument) => {
      localDebug('current map changed', latestMap);
      this.settingsCache.give(latestMap.settings);
      console.log(latestMap, latestMap.objects);

      this.objectsCache.give(Object.values(latestMap.objects));
      this.typesCache.give(Object.entries(latestMap.types).map(([key, value]) => ({
        ...value,
        id: key,
      })));
    })));
  }

  public settings<R extends GuestObjectType<MapSettingsDocument>>(guest: R) {
    this.settingsCache.value(guest);
    return guest;
  }

  public objects<R extends GuestObjectType<MapObjectDocument[]>>(guest: R) {
    localDebug('notify about new objects');
    this.objectsCache.value(guest);
    return guest;
  }

  public types<R extends GuestObjectType<MapTypeDocument[]>>(guest: R) {
    this.typesCache.value(guest);
    return guest;
  }

  public give(value: MapDocument) {
    localDebug('save map document', value);
    this.mapId.id(
      this.factories.guest.create((mapId: string) => {
        this.mapFile.mapFile(this.factories.guest.create((latestMapFile: MapFileDocument) => {
          this.mapFile.give({
            ...latestMapFile,
            [mapId]: value,
          });
        }));
      }),
    );
    return this;
  }
}
