import { Keyboard } from '@/modules/integration/browser/keyboard/Keyboard';
import { debug } from 'debug';
import {
  FactoryType,
  GuestAwareType,
  GuestObjectType,
  SourceType,
} from 'patron-oop';

const localDebug = debug('Modal');

export class Modal implements GuestObjectType<string> {
  private modalNameCache: SourceType<string>;

  public constructor(
    private keyboard: Keyboard,
    private factories: {
      cache: FactoryType<SourceType>,
      patron: FactoryType<GuestObjectType>,
      guest: FactoryType<GuestObjectType>,
      guestAware: FactoryType<GuestAwareType>,
      guestInTheMiddle: FactoryType<GuestObjectType>
    },
  ) {
    localDebug('modal created');
    this.modalNameCache = factories.cache.create(this, '');
    this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((key: string) => {
          localDebug('new key in modal', key);
          if (key === 'Escape') {
            this.give('');
          }
        }),
      ),
    );
  }

  public isOpenedByName<R extends GuestObjectType<boolean>>(name: string, guest: R) {
    this.modalNameCache.value(
      this.factories.guestInTheMiddle.create(guest, (modalName: string) => {
        guest.give(modalName === name);
      }),
    );
    return guest;
  }

  public openedByName(name: string): GuestAwareType<boolean> {
    return this.factories.guestAware.create(
      (guest: GuestObjectType<boolean>) => {
        this.isOpenedByName(name, guest);
      },
    );
  }

  public give(value: string): this {
    this.modalNameCache.give(value);
    return this;
  }
}
