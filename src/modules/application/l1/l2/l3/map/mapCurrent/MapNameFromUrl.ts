import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';

export class MapNameFromUrl {
  public constructor(
    private mapUrl: GuestAwareType<string>,
    private factories: {
      guest: FactoryType<GuestType>,
      guestInTheMiddle: FactoryType<GuestType>
    },
  ) {}

  public name(guest: GuestType<string>) {
    this.mapUrl.receiving(
      this.factories.guestInTheMiddle.create(guest, (url: string) => {
        let mapName = url.replace('/', '').replaceAll('/', '_');

        if (mapName.match('_')) {
          mapName = `_${mapName}`;
        }

        guest.receive(mapName);
      }),
    );
  }
}
