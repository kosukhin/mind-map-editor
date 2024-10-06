import { MapFileContentType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileContentType';
import { GuestType } from '@/modules/system/guest/GuestType';
import {
  NotificationType,
} from '@/modules/application/l1/l2/visualisation/notification/NotificationType';
import { debug } from 'debug';
import { CacheType } from '@/modules/system/guest/CacheType';
import { FactoryType } from '@/modules/system/guest/FactoryType';

const localDebug = debug('UrlContent');

export class UrlContent implements MapFileContentType {
  private contentCache: CacheType<string>

  public constructor(
    private notification: NotificationType,
    private factories: {
      cache: FactoryType<CacheType>,
      guest: FactoryType<GuestType>,
      patronOnce: FactoryType<GuestType>,
    },
  ) {
    this.contentCache = factories.cache.create();
  }

  public canBeUsed(guest: GuestType<boolean>): this {
    const canBeUsed = window.location.search.indexOf('?view=') > -1;
    localDebug('can be used', canBeUsed);
    guest.receive(window.location.search.indexOf('?view=') > -1);

    if (canBeUsed) {
      const url = window.location.search.split('=')[1] ?? '';

      fetch(url, { redirect: 'follow' }).then((r) => r.text()).then((text) => {
        localDebug('received text', text);
        this.contentCache.receive(text);
      });
    }

    return this;
  }

  public content(target: GuestType<string>): this {
    const url = window.location.search.split('=')[1] ?? '';
    localDebug('visit url', url);
    this.contentCache.receiving(this.factories.patronOnce.create(target));
    return this;
  }

  public receive(): this {
    this.notification.receive({
      type: 'error',
      text: 'Невозможно сохранить карту, открытую по ссылке!',
    });
    return this;
  }
}
