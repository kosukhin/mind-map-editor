import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { CacheType } from '@/modules/system/guest/CacheType';
import { debug } from 'debug';

const localDebug = debug('Drawer');

export class Drawer implements GuestType<string> {
  private drawerNameCache: CacheType<string>;

  public constructor(
    private factories: {
      cache: FactoryType<CacheType>,
      guestInTheMiddle: FactoryType<GuestType>
    },
  ) {
    this.drawerNameCache = factories.cache.create(this, '');
  }

  isOpenedByName<R extends GuestType<boolean>>(name: string, guest: R) {
    this.drawerNameCache.receiving(
      this.factories.guestInTheMiddle.create(guest, (drawerName: string) => {
        localDebug('new drawer name', drawerName);
        guest.receive(drawerName === name);
      }),
    );
    return guest;
  }

  receive(value: string): this {
    this.drawerNameCache.receive(value);
    return this;
  }
}
