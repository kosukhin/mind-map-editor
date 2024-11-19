import { TextType } from '@/modules/application/l1/l2/l3/l4/types/text/TextType';
import { GuestObjectType } from 'patron-oop';

export class TextOf implements TextType {
  public constructor(private text: string) {
  }

  public asString(guest: GuestObjectType<string>): GuestObjectType {
    guest.give(this.text);
    return guest;
  }
}
