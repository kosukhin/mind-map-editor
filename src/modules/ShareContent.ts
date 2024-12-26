import {
  GuestCast,
  GuestObjectType,
  SourceEmpty,
} from 'patron-oop';

const sharedSource = new SourceEmpty<string>();

export class ShareContent {
  private fromLocalStorage: string

  public constructor() {
    this.fromLocalStorage = localStorage.getItem('shared-map') || '';
  }

  public canBeUsed(guest: GuestObjectType<boolean>) {
    fetch('/share-file-content')
      .then((resp) => resp.json())
      .then((resp) => {
        console.log('json result', resp);

        if (!resp.data) {
          if (this.fromLocalStorage) {
            guest.give(true);
          }
        }

        sharedSource.give(resp.data);
      });

    sharedSource.value(new GuestCast(guest, (v) => {
      guest.give(!!v);
    }));

    return guest;
  }

  public content(target: GuestObjectType<string>): this {
    sharedSource.value(new GuestCast(target, (v) => {
      if (this.fromLocalStorage) {
        target.give(this.fromLocalStorage);
      } else if (v) {
        target.give(v);
      }
    }));
    return this;
  }

  public give(value: string): this {
    console.log('save value', value);

    this.fromLocalStorage = value;
    localStorage.setItem('shared-map', value);
    return this;
  }
}
