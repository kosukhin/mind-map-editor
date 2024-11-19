import { GuestObjectType, FactoryType, ChainType } from 'patron-oop';
import {
  MapDocument,
  MapObjectDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import {
  CheckNotificationType,
} from '@/modules/application/l1/l2/l3/map/checks/CheckNotificationType';

export class MapObjectRemoved implements GuestObjectType<MapObjectDocument> {
  public constructor(
    private map: MapType,
    private mapFile: MapFileType,
    private checks: CheckNotificationType<MapObjectDocument>[],
    private factories: {
      guest: FactoryType<GuestObjectType>,
      chain: FactoryType<ChainType>
    },
  ) {}

  public give(value: MapObjectDocument): this {
    const checksChain = this.factories.chain.create(this);
    this.checks.forEach((check, index) => {
      check.breakOnFail(value, checksChain.receiveKey(String(index)));
    });

    checksChain.result(this.factories.guest.create(() => {
      this.mapFile.currentMap(this.factories.guest.create((latestMap: MapDocument) => {
        delete latestMap.objects[value.id];
        this.map.give(latestMap);
      }));
    }));

    return this;
  }
}
