import { GuestObjectType, GuestAwareType, FactoryType } from 'patron-oop';

export class TextNoHtml {
  public constructor(
    private text: GuestAwareType<string>,
    private factories: {
      guestInTheMiddle: FactoryType<GuestObjectType>;
    },
  ) {}

  public noHtml(guest: GuestObjectType<string>) {
    this.text.value(
      this.factories.guestInTheMiddle.create(guest, (text: string) => {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = text;
        const noHtmlText = tmp.textContent || tmp.innerText || '';
        guest.give(noHtmlText);
      }),
    );

    return guest;
  }
}
