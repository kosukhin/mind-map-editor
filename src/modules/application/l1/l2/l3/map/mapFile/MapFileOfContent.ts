import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { MapFileContentType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileContentType';
import {
  MapDocument,
  MapFileDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { debug } from 'debug';
import { GuestType } from '@/modules/system/guest/GuestType';
import { InstanceType } from '@/modules/system/guest/InstanceType';
import { PoolType } from '@/modules/system/guest/PoolType';
import { Transformed } from '@/modules/system/transformed/Transformed';

const localDebug = debug('MapFileOfContent');

export class MapFileOfContent implements MapFileType {
  private currentMapPatrons: PoolType<MapDocument>;

  private mapFilePatrons: PoolType<MapFileDocument>;

  public constructor(
    private mapFileContent: MapFileContentType,
    pool: InstanceType<PoolType<unknown>>,
    private guestInTheMiddle: InstanceType<GuestType<unknown>>,
    private transformToString: InstanceType<Transformed<string>>,
    private transformToMapFile: InstanceType<Transformed<unknown>>,
  ) {
    this.currentMapPatrons = pool.create(this);
    this.mapFilePatrons = pool.create(this);
  }

  public currentMap(currentMapGuest: GuestType<MapDocument>): this {
    this.mapFile(this.guestInTheMiddle.create(currentMapGuest, (value: MapFileDocument) => {
      this.currentMapPatrons.distribute(value.current, currentMapGuest);
    }));
    return this;
  }

  public receive(value: MapFileDocument): this {
    localDebug('save map file document', value);
    this.mapFileContent.receive(this.transformToString.create(value).result());
    return this;
  }

  public mapFile(mapFileTarget: GuestType<MapFileDocument>): this {
    this.mapFileContent.content(this.guestInTheMiddle.create(mapFileTarget, (value: string) => {
      const mapFile = this.transformToMapFile.create(value).result();
      this.mapFilePatrons.distribute(<MapFileDocument>mapFile, mapFileTarget);
    }));
    return this;
  }
}
