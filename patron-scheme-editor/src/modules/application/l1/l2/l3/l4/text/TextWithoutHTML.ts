import { TextType } from '@/modules/application/l1/l2/l3/l4/types/text/TextType';
import { GuestObjectType, FactoryType } from 'patron-oop';

export class TextWithoutHTML implements TextType {
  public constructor(
    private baseText: TextType,
    private factories: {
      guestInTheMiddle: FactoryType<GuestObjectType>;
    },
  ) {}

  public asString(guest: GuestObjectType<string>): GuestObjectType {
    this.baseText.asString(
      this.factories.guestInTheMiddle.create(guest, (text: string) => {
        guest.give((text ?? '').replace(/<\/?[^>]+>/gi, ' '));
      }),
    );
    return guest;
  }
}
