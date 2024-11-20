import { CheckType } from '@/modules/application/l1/l2/l3/map/checks/CheckType';
import {
  MapDocument,
  MapTypeWithNameDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestObjectType, FactoryType } from 'patron-oop';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { debug } from 'debug';

const localDebug = debug('MapTypeUsed');

export class MapTypeUsed implements CheckType<MapTypeWithNameDocument> {
  public constructor(
    private mapFile: MapFileType,
    private factories: {
      guest: FactoryType<GuestObjectType>;
    },
  ) {}

  check(value: MapTypeWithNameDocument, guest: GuestObjectType<true | string>): this {
    this.mapFile.currentMap(
      this.factories.guest.create((latestMap: MapDocument) => {
        const isTypeUsed = Object.values(latestMap.objects).some(
          (object) => object.type === value.name,
        );
        localDebug('is type used', isTypeUsed);
        guest.give(!isTypeUsed || 'Тип карты использован');
      }),
    );
    return this;
  }
}
