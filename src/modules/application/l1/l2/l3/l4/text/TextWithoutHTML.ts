import { TextType } from '@/modules/application/l1/l2/l3/l4/types/text/TextType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';

export class TextWithoutHTML implements TextType {
  public constructor(
    private baseText: TextType,
    private factories: {
      guestInTheMiddle: FactoryType<GuestType>,
    },
  ) {
  }

  public asString(guest: GuestType<string>): GuestType {
    this.baseText.asString(
      this.factories.guestInTheMiddle.create(guest, (text: string) => {
        guest.receive((text ?? '').replace(/<\/?[^>]+>/gi, ' '));
      }),
    );
    return guest;
  }
}
