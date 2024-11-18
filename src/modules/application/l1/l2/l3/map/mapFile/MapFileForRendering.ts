import {
  MapDocument,
  MapFileDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapCurrentIDType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentIDType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { debug } from 'debug';
import {
  FactoryType, GuestObjectType,
  SourceType,
} from 'patron-oop';

const localDebug = debug('MapFileForRendering');

/**
 * Отдельный источник текущего файла карты - только для целей быстрого рендеринга
 */
export class MapFileForRendering implements MapFileType {
  private readonly mapCache: SourceType<MapDocument>

  public constructor(
    mapFile: MapFileType,
    private mapId: MapCurrentIDType,
    private factories: {
      cache: FactoryType<SourceType>,
      patron: FactoryType<GuestObjectType>,
      guestInTheMiddle: FactoryType<GuestObjectType>,
      guest: FactoryType<GuestObjectType>,
    },
  ) {
    this.mapCache = factories.cache.create({ objects: {}, types: {}, settings: {} });
    mapFile.currentMap(factories.patron.create(this.mapCache));
  }

  public currentMap(target: GuestObjectType<MapDocument>) {
    this.mapCache.value(target);
    return target;
  }

  public mapFile(target: GuestObjectType<MapFileDocument>) {
    this.mapCache.value(
      this.factories.guestInTheMiddle.create(target, (map: MapDocument) => {
        this.mapId.id(
          this.factories.guest.create((mapId: string) => {
            target.give({ [mapId]: map });
          }),
        );
      }),
    );
    return target;
  }

  public give(value: MapFileDocument): this {
    this.mapId.id(
      this.factories.guest.create((mapId: string) => {
        localDebug('received map file, objects = ', value[mapId].objects);
        this.mapCache.give(value[mapId]);
      }),
    );
    return this;
  }
}
