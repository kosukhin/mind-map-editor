import {
  MapObjectParentNamesType,
} from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectParentNamesType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { ChainType } from '@/modules/system/guest/ChainType';
import {
  MapFileDocument,
  MapTypeDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

type ListChainProps = {parentNames: string[], mapFile: MapFileDocument};

export class ParentTypes {
  public constructor(
    private parentNames: MapObjectParentNamesType,
    private mapFile: MapFileType,
    private factories: {
      guestInTheMiddle: FactoryType<GuestType>,
      guestCast: FactoryType<GuestType>,
      guest: FactoryType<GuestType>,
      chain: FactoryType<ChainType>
    },
  ) {
  }

  public types(guest: GuestType<MapTypeDocument[]>) {
    const chain = this.factories.chain.create();
    this.parentNames.names(this.factories.guestCast.create(guest, chain.receiveKey('parentNames')));
    this.mapFile.mapFile(this.factories.guestCast.create(guest, chain.receiveKey('mapFile')));
    chain.result(this.factories.guestCast.create(guest, ({ parentNames, mapFile }: ListChainProps) => {
      const types: Record<string, MapTypeDocument> = {};
      const maps = parentNames.map((mapName) => mapFile[mapName]);
      maps.forEach((map) => {
        Object.values(map.types).forEach((type) => {
          types[type.name] = type;
        });
      });
      guest.receive(Object.values(types));
    }));
    return guest;
  }
}
