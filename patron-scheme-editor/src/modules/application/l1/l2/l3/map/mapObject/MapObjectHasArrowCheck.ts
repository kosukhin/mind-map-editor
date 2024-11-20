import { CheckType } from '@/modules/application/l1/l2/l3/map/checks/CheckType';
import {
  MapDocument,
  MapObjectDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestObjectType, FactoryType } from 'patron-oop';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';

/**
 * Проверяет что объект карты имеет хотя бы одну входяую стрелку
 */
export class MapObjectHasArrowCheck implements CheckType<MapObjectDocument> {
  public constructor(
    private mapFile: MapFileType,
    private factories: {
      guest: FactoryType<GuestObjectType>;
    },
  ) {}

  public check(value: MapObjectDocument, guest: GuestObjectType<true | string>): this {
    this.mapFile.currentMap(
      this.factories.guest.create((map: MapDocument) => {
        let hasIncomeArrow = false;
        Object.values(map.objects).forEach((object) => {
          hasIncomeArrow = hasIncomeArrow || object.arrows.some((arrow) => arrow.id === value.id);
        });

        guest.give(!hasIncomeArrow || 'У объекта есть входящие связи!');
      }),
    );
    return this;
  }
}
