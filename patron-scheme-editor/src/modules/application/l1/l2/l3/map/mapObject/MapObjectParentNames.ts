import { MapCurrentIDType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentIDType';
import { FactoryType, GuestObjectType } from 'patron-oop';
import { MapObjectParentNamesType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectParentNamesType';

export class MapObjectParentNames implements MapObjectParentNamesType {
  public constructor(
    private mapId: MapCurrentIDType,
    private factories: {
      guestInTheMiddle: FactoryType<GuestObjectType>;
      guest: FactoryType<GuestObjectType>;
    },
  ) {}

  names<R extends GuestObjectType<string[]>>(guest: R) {
    this.mapId.id(
      this.factories.guestInTheMiddle.create(guest, (mapId: string) => {
        const chunks = mapId.split('_').filter((v) => !!v);
        let accumulator = '';
        const names = chunks.map((chunk) => {
          const theName = `${accumulator}${chunk}`;
          if (!accumulator) {
            accumulator = '_';
          }
          accumulator += `${chunk}_`;
          return theName;
        });
        accumulator = '';
        guest.give(names);
      }),
    );
    return guest;
  }
}
