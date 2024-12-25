import {
  GuestCast,
  GuestObjectType,
  SourceEmpty,
} from 'patron-oop';

const sharedSource = new SourceEmpty();

export class ShareContent {
  public constructor(
    private notification: any,
  ) {
  }

  public canBeUsed(guest: GuestObjectType<boolean>) {
    fetch('/share-file-content')
      .then((resp) => resp.json())
      .then((resp) => {
        console.log('json result', resp);

        sharedSource.give(resp.data);
      });

    sharedSource.value(new GuestCast(guest, (v) => {
      guest.give(!!v);
    }));
    return guest;
  }

  public content(target: GuestObjectType<string>): this {
    sharedSource.value(target);
    return this;
  }

  public give(): this {
    this.notification.give({
      type: 'error',
      text: 'Невозможно сохранить карту, открытую через share!',
    });
    return this;
  }
}
