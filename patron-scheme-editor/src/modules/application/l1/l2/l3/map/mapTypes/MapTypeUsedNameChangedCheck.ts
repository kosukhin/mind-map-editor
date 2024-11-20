import { CheckType } from '@/modules/application/l1/l2/l3/map/checks/CheckType';
import { MapTypeWithNameDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { FactoryType, GuestObjectType } from 'patron-oop';

export class MapTypeUsedNameChangedCheck implements CheckType<MapTypeWithNameDocument> {
  public constructor(
    private mapTypeUsedCheck: CheckType<MapTypeWithNameDocument>,
    private factories: {
      guest: FactoryType<GuestObjectType>;
    },
  ) {}

  check(value: MapTypeWithNameDocument, guest: GuestObjectType<true | string>): this {
    this.mapTypeUsedCheck.check(
      value,
      this.factories.guest.create((result: true | string) => {
        if (result !== true && value.name !== value.type.name) {
          guest.give('Нельзя изменять имя типа, который использован!');
        } else {
          guest.give(true);
        }
      }),
    );
    return this;
  }
}
