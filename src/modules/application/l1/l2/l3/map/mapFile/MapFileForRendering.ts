import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { CacheType } from '@/modules/system/guest/CacheType';
import {
  MapDocument,
  MapFileDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { debug } from 'debug';

const localDebug = debug('MapFileForRendering');

/**
 * Отдельный источник текущего файла карты - только для целей быстрого рендеринга
 */
export class MapFileForRendering implements MapFileType {
  private readonly mapCache: CacheType<MapDocument>

  public constructor(
    mapFile: MapFileType,
    private factories: {
      cache: FactoryType<CacheType>,
      patron: FactoryType<GuestType>,
      guestInTheMiddle: FactoryType<GuestType>,
    },
  ) {
    this.mapCache = factories.cache.create(this, { objects: {}, types: {}, settings: {} });
    mapFile.currentMap(factories.patron.create(this.mapCache));
  }

  public currentMap(target: GuestType<MapDocument>) {
    this.mapCache.receiving(target);
    return target;
  }

  public mapFile(target: GuestType<MapFileDocument>): this {
    this.mapCache.receiving(
      this.factories.guestInTheMiddle.create(target, (map: MapDocument) => {
        target.receive({ current: map });
      }),
    );
    return this;
  }

  public receive(value: MapFileDocument): this {
    localDebug('received map file, objects = ', value.current.objects);
    this.mapCache.receive(value.current);
    return this;
  }
}
