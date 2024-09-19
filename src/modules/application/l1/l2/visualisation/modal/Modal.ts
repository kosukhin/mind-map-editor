import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { CacheType } from '@/modules/system/guest/CacheType';

export class Modal implements GuestType<string> {
  private modalNameCache: CacheType<string>;

  public constructor(
    private factories: {
      cache: FactoryType<CacheType>,
      guestInTheMiddle: FactoryType<GuestType>
    },
  ) {
    this.modalNameCache = factories.cache.create(this, '');
  }

  isOpenedByName<R extends GuestType<boolean>>(name: string, guest: R) {
    this.modalNameCache.receiving(
      this.factories.guestInTheMiddle.create(guest, (modalName: string) => {
        guest.receive(modalName === name);
      }),
    );
    return guest;
  }

  receive(value: string): this {
    this.modalNameCache.receive(value);
    return this;
  }
}
