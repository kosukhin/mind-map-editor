import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { MapFileContentType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileContentType';
import {
  MapDocument,
  MapFileDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { debug } from 'debug';
import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { PoolType } from '@/modules/system/guest/PoolType';
import { Transformed } from '@/modules/system/transformed/Transformed';

const localDebug = debug('MapFileOfContent');

export class MapFileOfContent implements MapFileType {
  private currentMapPatrons: PoolType<MapDocument>;

  private mapFilePatrons: PoolType<MapFileDocument>;

  public constructor(
    private mapFileContent: MapFileContentType,
    private factories: {
      pool: FactoryType<PoolType>,
      guestInTheMiddle: FactoryType<GuestType>,
      transformToString: FactoryType<Transformed<string>>,
      transformToObject: FactoryType<Transformed>,
    },
  ) {
    this.currentMapPatrons = factories.pool.create(this);
    this.mapFilePatrons = factories.pool.create(this);
  }

  public currentMap(currentMapGuest: GuestType<MapDocument>): this {
    this.mapFile(this.factories.guestInTheMiddle.create(currentMapGuest, (value: MapFileDocument) => {
      localDebug('get current map', value, typeof value);
      this.currentMapPatrons.distribute(value.current, currentMapGuest);
    }));
    return this;
  }

  public receive(value: MapFileDocument): this {
    localDebug('save map file document', value);
    this.mapFileContent.receive(this.factories.transformToString.create(value).result());
    return this;
  }

  public mapFile(mapFileTarget: GuestType<MapFileDocument>): this {
    this.mapFileContent.content(this.factories.guestInTheMiddle.create(mapFileTarget, (value: string) => {
      const mapFile = this.factories.transformToObject.create(value).result();
      localDebug('get map file', mapFile);
      this.mapFilePatrons.distribute(<MapFileDocument>mapFile, mapFileTarget);
    }));
    return this;
  }
}
