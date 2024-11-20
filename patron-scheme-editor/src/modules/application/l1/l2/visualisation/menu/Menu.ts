import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import {
  MapDocument,
  MapObjectDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestObjectType, Factory } from 'patron-oop';

/**
 * Контент для вывода меню карты
 */
export class Menu {
  public constructor(
    private mapFile: MapFileType,
    private factories: {
      guestInTheMiddle: Factory<GuestObjectType>;
    },
  ) {}

  menuObjects<R extends GuestObjectType<MapObjectDocument[]>>(guest: R) {
    this.mapFile.currentMap(
      this.factories.guestInTheMiddle.create(guest, (map: MapDocument) => {
        const menuObjects = Object.values(map.objects).filter((object) => object.inMenu);
        guest.give(menuObjects);
      }),
    );
    return guest;
  }
}
