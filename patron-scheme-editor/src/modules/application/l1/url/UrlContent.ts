import { MapFileContentType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileContentType';
import { GuestObjectType, SourceType, FactoryType } from 'patron-oop';
import { NotificationType } from '@/modules/application/l1/l2/visualisation/notification/NotificationType';
import { debug } from 'debug';

const localDebug = debug('UrlContent');

export class UrlContent implements MapFileContentType {
  private contentCache: SourceType<string>;

  public constructor(
    private notification: NotificationType,
    private factories: {
      sourceEmpty: FactoryType<SourceType>;
      guest: FactoryType<GuestObjectType>;
      patronOnce: FactoryType<GuestObjectType>;
    },
  ) {
    this.contentCache = factories.sourceEmpty.create();
  }

  public canBeUsed(guest: GuestObjectType<boolean>) {
    if (!window) {
      guest.give(false);
      return this;
    }
    const canBeUsed = window.location.search.indexOf('?view=') > -1;
    localDebug('can be used', canBeUsed);
    guest.give(window.location.search.indexOf('?view=') > -1);

    if (canBeUsed) {
      const url = window.location.search.split('=')[1] ?? '';

      fetch(url, { redirect: 'follow' })
        .then((r) => r.text())
        .then((text) => {
          localDebug('received text', text);
          this.contentCache.give(text);
        });
    }

    return guest;
  }

  public content(target: GuestObjectType<string>): this {
    if (!window) {
      return this;
    }
    const url = window.location.search.split('=')[1] ?? '';
    localDebug('visit url', url);
    this.contentCache.value(this.factories.patronOnce.create(target));
    return this;
  }

  public give(): this {
    this.notification.give({
      type: 'error',
      text: 'Невозможно сохранить карту, открытую по ссылке!',
    });
    return this;
  }
}
