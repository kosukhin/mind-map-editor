import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { GuestType } from '@/modules/system/guest/GuestType';
import {
  MapDocument,
  MapObjectDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { Factory } from '@/modules/system/guest/Factory';

/**
 * Контент для вывода меню карты
 */
export class Menu {
  public constructor(
    private mapFile: MapFileType,
    private factories: {
      guestInTheMiddle: Factory<GuestType>,
    },
  ) {}

  menuObjects<R extends GuestType<MapObjectDocument[]>>(guest: R) {
    this.mapFile.currentMap(
      this.factories.guestInTheMiddle.create(guest, (map: MapDocument) => {
        const menuObjects = Object.values(map.objects).filter((object) => object.inMenu);
        guest.receive(menuObjects);
      }),
    );
    return guest;
  }
}
