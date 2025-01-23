import { MapObjectParentNamesType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectParentNamesType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { FactoryType, GuestObjectType, GuestAwareAllType } from 'patron-oop';
import {
  MapFileDocument,
  MapTypeDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { debug } from 'debug';

type ListChainProps = { parentNames: string[]; mapFile: MapFileDocument };

const localDebug = debug('ParentTypes');

export class ParentTypes {
  public constructor(
    private parentNames: MapObjectParentNamesType,
    private mapFile: MapFileType,
    private factories: {
      guestInTheMiddle: FactoryType<GuestObjectType>;
      guestCast: FactoryType<GuestObjectType>;
      guest: FactoryType<GuestObjectType>;
      chain: FactoryType<GuestAwareAllType>;
    },
  ) { }

  public types<R extends GuestObjectType<MapTypeDocument[]>>(guest: R) {
    localDebug('parent types requested');
    const chain = this.factories.chain.create();
    this.parentNames.names(this.factories.guestCast.create(guest, chain.guestKey('parentNames')));
    this.mapFile.mapFile(this.factories.guestCast.create(guest, chain.guestKey('mapFile')));
    chain.value(
      this.factories.guestInTheMiddle.create(guest, ({ parentNames, mapFile }: ListChainProps) => {
        const parentNamesWithoutCurrent = parentNames.slice(0, -1);
        localDebug('parent names', parentNamesWithoutCurrent);
        const types: Record<string, MapTypeDocument> = {};
        const maps = parentNamesWithoutCurrent.map((mapName) => mapFile[mapName]);
        maps.forEach((map) => {
          Object.values(map.types).forEach((type) => {
            types[type.name] = type;
          });
        });
        guest.give(Object.values(types));
      }),
    );

    return guest;
  }
}
