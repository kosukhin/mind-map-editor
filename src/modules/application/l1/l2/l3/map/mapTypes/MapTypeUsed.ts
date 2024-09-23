import { CheckType } from '@/modules/application/l1/l2/l3/map/checks/CheckType';
import {
  MapDocument,
  MapTypeWithNameDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestType } from '@/modules/system/guest/GuestType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { debug } from 'debug';

const localDebug = debug('MapTypeUsed');

export class MapTypeUsed implements CheckType<MapTypeWithNameDocument> {
  public constructor(
    private mapFile: MapFileType,
    private factories: {
      guest: FactoryType<GuestType>
    },
  ) {}

  check(value: MapTypeWithNameDocument, guest: GuestType<true | string>): this {
    this.mapFile.currentMap(this.factories.guest.create((latestMap: MapDocument) => {
      const isTypeUsed = Object.values(latestMap.objects).some((object) => object.type === value.name);
      localDebug('is type used', isTypeUsed);
      guest.receive(!isTypeUsed || 'Тип карты использован');
    }));
    return this;
  }
}
