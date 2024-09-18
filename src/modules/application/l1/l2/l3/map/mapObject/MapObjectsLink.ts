import { MapObjectCurrent } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectCurrent';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { GuestType } from '@/modules/system/guest/GuestType';

/**
 * Связь нескольких объектов стрелкой
 */
export class MapObjectsLink {
  public constructor(
    private mapObjectCurrent: MapObjectCurrent,
    private factories: {
      guest: FactoryType<GuestType>
    },
  ) {
  }

  public startLink() {
    this.mapObjectCurrent.silenceOn(
      this.factories.guest.create((objectId: string) => {
        console.log('link object id', objectId);
      }),
    );
  }
}
