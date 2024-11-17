import { GuestAwareType, GuestObjectType, FactoryType } from 'patron-oop';

export class MapNameFromUrl {
  public constructor(
    private mapUrl: GuestAwareType<string>,
    private factories: {
      guest: FactoryType<GuestObjectType>,
      guestInTheMiddle: FactoryType<GuestObjectType>
    },
  ) {}

  public name(guest: GuestObjectType<string>) {
    this.mapUrl.value(
      this.factories.guestInTheMiddle.create(guest, (url: string) => {
        let mapName = url.replace('/', '').replaceAll('/', '_');

        if (mapName.match('_')) {
          mapName = `_${mapName}`;
        }

        guest.give(mapName);
      }),
    );
  }
}
