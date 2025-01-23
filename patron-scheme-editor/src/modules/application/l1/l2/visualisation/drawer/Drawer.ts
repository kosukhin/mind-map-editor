import { Keyboard } from '@/modules/integration/browser/keyboard/Keyboard';
import { debug } from 'debug';
import { FactoryType, GuestAwareObjectType, GuestObjectType, SourceType } from 'patron-oop';

const localDebug = debug('Drawer');

export class Drawer implements GuestObjectType<string> {
  private drawerNameCache: SourceType<string>;

  public constructor(
    private keyboard: Keyboard,
    private factories: {
      cache: FactoryType<SourceType>;
      guestInTheMiddle: FactoryType<GuestObjectType>;
      patron: FactoryType<GuestObjectType>;
      guest: FactoryType<GuestObjectType>;
      guestAware: FactoryType<GuestAwareObjectType<any>>;
    },
  ) {
    this.drawerNameCache = factories.cache.create('');
    this.keyboard.pressed(
      this.factories.patron.create(
        this.factories.guest.create((key: string) => {
          localDebug('new key in drawer', key);
          if (key === 'Escape') {
            this.give('');
          }
        }),
      ),
    );
  }

  public isOpenedByName<R extends GuestObjectType<boolean>>(name: string, guest: R) {
    this.drawerNameCache.value(
      this.factories.guestInTheMiddle.create(guest, (drawerName: string) => {
        localDebug('new drawer name', drawerName);
        guest.give(drawerName === name);
      }),
    );
    return guest;
  }

  public openedByName(name: string): GuestAwareObjectType<boolean> {
    return this.factories.guestAware.create((guest: GuestObjectType<boolean>) => {
      this.isOpenedByName(name, guest);
    });
  }

  public give(value: string): this {
    this.drawerNameCache.give(value);
    return this;
  }
}
