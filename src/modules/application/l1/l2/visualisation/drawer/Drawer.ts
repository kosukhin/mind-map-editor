import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { CacheType } from '@/modules/system/guest/CacheType';
import { debug } from 'debug';
import { Keyboard } from '@/modules/integration/browser/keyboard/Keyboard';
import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';

const localDebug = debug('Drawer');

export class Drawer implements GuestType<string> {
  private drawerNameCache: CacheType<string>;

  public constructor(
    private keyboard: Keyboard,
    private factories: {
      cache: FactoryType<CacheType>,
      guestInTheMiddle: FactoryType<GuestType>,
      patron: FactoryType<GuestType>,
      guest: FactoryType<GuestType>,
      guestAware: FactoryType<GuestAwareType>
    },
  ) {
    this.drawerNameCache = factories.cache.create(this, '');
    this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((key: string) => {
          localDebug('new key in drawer', key);
          if (key === 'Escape') {
            this.receive('');
          }
        }),
      ),
    );
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

  openedByName(name: string): GuestAwareType<boolean> {
    return this.factories.guestAware.create(
      (guest: GuestType<boolean>) => {
        this.isOpenedByName(name, guest);
      },
    );
  }

  receive(value: string): this {
    this.drawerNameCache.receive(value);
    return this;
  }
}
