import { TextType } from '@/modules/application/l1/l2/l3/l4/types/text/TextType';
import { GuestType } from '@/modules/system/guest/GuestType';

export class TextOf implements TextType {
  public constructor(private text: string) {
  }

  public asString(guest: GuestType<string>): GuestType {
    guest.receive(this.text);
    return guest;
  }
}
