import { GuestType } from '@/modules/system/guest/GuestType';
import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { FactoryType } from '@/modules/system/guest/FactoryType';

export class TextNoHtml {
  public constructor(
    private text: GuestAwareType<string>,
    private factories: {
      guestInTheMiddle: FactoryType<GuestType>
    },
  ) {}

  public noHtml(guest: GuestType<string>) {
    this.text.receiving(
      this.factories.guestInTheMiddle.create(guest, (text: string) => {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = text;
        const noHtmlText = tmp.textContent || tmp.innerText || '';
        guest.receive(noHtmlText);
      }),
    );

    return guest;
  }
}
