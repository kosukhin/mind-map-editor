import {
  GuestCast,
  GuestObjectType,
  SourceType,
} from 'patron-oop';

export interface ShareFileDocument {
  name: string,
  content: string,
  mime: string,
}

export class ShareContent {
  public constructor(private sharedSource: SourceType<ShareFileDocument>) {
  }

  public canBeUsed(guest: GuestObjectType<boolean>) {
    fetch('/share-file-content')
      .then((resp) => resp.json())
      .then((resp) => {
        console.log('json result', resp);
        guest.give(true);
        this.sharedSource.give(resp.data);
      });

    this.sharedSource.value(new GuestCast(guest, (v) => {
      console.log('share source value');

      guest.give(!!v);
    }));

    return guest;
  }

  public content(target: GuestObjectType<string>): this {
    this.sharedSource.value(new GuestCast(target, (v) => {
      if (v) {
        target.give(v.content);
      }
    }));
    return this;
  }

  public give(content: string): this {
    this.sharedSource.value((value) => {
      this.sharedSource.give({
        ...value,
        content,
      });
    });
    return this;
  }
}
