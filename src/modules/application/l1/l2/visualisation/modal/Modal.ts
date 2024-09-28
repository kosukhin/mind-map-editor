import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { CacheType } from '@/modules/system/guest/CacheType';
import { Keyboard } from '@/modules/integration/browser/keyboard/Keyboard';
import { debug } from 'debug';
import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';

const localDebug = debug('Modal');

export class Modal implements GuestType<string> {
  private modalNameCache: CacheType<string>;

  public constructor(
    private keyboard: Keyboard,
    private factories: {
      cache: FactoryType<CacheType>,
      patron: FactoryType<GuestType>,
      guest: FactoryType<GuestType>,
      guestAware: FactoryType<GuestAwareType>,
      guestInTheMiddle: FactoryType<GuestType>
    },
  ) {
    localDebug('modal created');
    this.modalNameCache = factories.cache.create(this, '');
    this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((key: string) => {
          localDebug('new key in modal', key);
          if (key === 'Escape') {
            this.receive('');
          }
        }),
      ),
    );
  }

  isOpenedByName<R extends GuestType<boolean>>(name: string, guest: R) {
    this.modalNameCache.receiving(
      this.factories.guestInTheMiddle.create(guest, (modalName: string) => {
        guest.receive(modalName === name);
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
    this.modalNameCache.receive(value);
    return this;
  }
}
