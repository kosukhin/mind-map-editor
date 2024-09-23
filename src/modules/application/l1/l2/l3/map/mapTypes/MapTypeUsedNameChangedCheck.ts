import { CheckType } from '@/modules/application/l1/l2/l3/map/checks/CheckType';
import { MapTypeWithNameDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { GuestType } from '@/modules/system/guest/GuestType';

export class MapTypeUsedNameChangedCheck implements CheckType<MapTypeWithNameDocument> {
  public constructor(
    private mapTypeUsedCheck: CheckType<MapTypeWithNameDocument>,
    private factories: {
      guest: FactoryType<GuestType>
    },
  ) {}

  check(value: MapTypeWithNameDocument, guest: GuestType<true | string>): this {
    this.mapTypeUsedCheck.check(value, this.factories.guest.create((result: true | string) => {
      if (result !== true && value.name !== value.type.name) {
        guest.receive('Нельзя изменять имя типа, который использован!');
      } else {
        guest.receive(true);
      }
    }));
    return this;
  }
}
