import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { MapFileDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { debug } from 'debug';
import {
  MapObjectParentNamesType,
} from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectParentNamesType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { ChainType } from '@/modules/system/guest/ChainType';

const localDebug = debug('Breadcrumbs');
type ListChainProps = {names: string[], mapFile: MapFileDocument};

export class Breadcrumbs {
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

  list<R extends GuestType<unknown[]>>(guest: R) {
    const chain = this.factories.chain.create();
    this.parentNames.names(this.factories.guestCast.create(guest, chain.receiveKey('names')));
    this.mapFile.mapFile(this.factories.guestCast.create(guest, chain.receiveKey('mapFile')));
    chain.result(
      this.factories.guestInTheMiddle.create(guest, ({ names, mapFile }: ListChainProps) => {
        localDebug('map id', names, mapFile);
        guest.receive(names.map((name) => ({
          title: mapFile[name]?.settings?.title || 'unknown',
          name,
        })));
      }),
    );
    return guest;
  }
}
