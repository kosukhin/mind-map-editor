import {
  GuestObjectType,
  SourceEmpty,
} from 'patron-oop';

console.log('init shared content');

const contentCache = new SourceEmpty<string>();
const canBeUsedSource = new SourceEmpty<boolean>();
const swChannel = new BroadcastChannel('sw-channel');
swChannel.onmessage = (event) => {
  console.log('new channel message', event);

  canBeUsedSource.give(true);
  contentCache.give(event.data);
};

export class ShareContent {
  public constructor(
    private notification: any,
  ) {
  }

  public canBeUsed(guest: GuestObjectType<boolean>) {
    canBeUsedSource.value(guest);
    return guest;
  }

  public content(target: GuestObjectType<string>): this {
    contentCache.value(target);
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
