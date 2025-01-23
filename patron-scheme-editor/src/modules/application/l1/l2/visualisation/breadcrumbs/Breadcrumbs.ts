import { GuestObjectType, FactoryType, GuestAwareAllType } from 'patron-oop';
import { MapFileDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { debug } from 'debug';
import { MapObjectParentNamesType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectParentNamesType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';

const localDebug = debug('Breadcrumbs');
type ListChainProps = { names: string[]; mapFile: MapFileDocument };

export class Breadcrumbs {
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

  list<R extends GuestObjectType<unknown[]>>(guest: R) {
    const chain = this.factories.chain.create();
    this.parentNames.names(this.factories.guestCast.create(guest, chain.guestKey('names')));
    this.mapFile.mapFile(this.factories.guestCast.create(guest, chain.guestKey('mapFile')));
    chain.value(
      this.factories.guestInTheMiddle.create(guest, ({ names, mapFile }: ListChainProps) => {
        localDebug('map id', names, mapFile);
        guest.give(
          names.map((name) => ({
            title: mapFile[name]?.settings?.title || 'unknown',
            name,
          })),
        );
      }),
    );
    return guest;
  }
}
