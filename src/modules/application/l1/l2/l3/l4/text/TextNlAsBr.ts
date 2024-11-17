import { TextType } from '@/modules/application/l1/l2/l3/l4/types/text/TextType';
import { GuestObjectType, Factory } from 'patron-oop';
import { debug } from 'debug';

const localDebug = debug('TextNlAsBr');

export class TextNlAsBr implements TextType {
  public constructor(
    private baseText: TextType,
    private factories: {
      guestInTheMiddle: Factory<GuestObjectType>,
    },
  ) {
  }

  public asString(guest: GuestObjectType<string>): GuestObjectType {
    this.baseText.asString(
      this.factories.guestInTheMiddle.create(guest, (text: string) => {
        if (typeof text === 'undefined' || text === null) {
          return '';
        }
        const breakTag = '<br />';
        localDebug(text);
        guest.give((text ?? '').replace(
          /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
          `$1${breakTag}$2`,
        ));
        return true;
      }),
    );
    return guest;
  }
}
