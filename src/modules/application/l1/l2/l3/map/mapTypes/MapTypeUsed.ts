import { CheckType } from '@/modules/application/l1/l2/l3/map/checks/CheckType';
import {
  MapDocument,
  MapTypeDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestType } from '@/modules/system/guest/GuestType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { FactoryType } from '@/modules/system/guest/FactoryType';

export class MapTypeUsed implements CheckType<MapTypeDocument> {
  public constructor(
    private mapFile: MapFileType,
    private factories: {
      guest: FactoryType<GuestType>
    },
  ) {}

  check(value: MapTypeDocument, guest: GuestType<boolean>): this {
    this.mapFile.currentMap(this.factories.guest.create((latestMap: MapDocument) => {
      const isTypeUsed = Object.values(latestMap.objects).some((object) => object.type === value.name);
      guest.receive(isTypeUsed);
    }));
    return this;
  }
}
