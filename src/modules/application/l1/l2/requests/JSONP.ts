import { GuestType } from '@/modules/system/guest/GuestType';
import { JSONPType } from '@/modules/application/l1/l2/requests/JSONPType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { useScriptTag } from '@vueuse/core';
import { CacheType } from '@/modules/system/guest/CacheType';

export class JSONP implements JSONPType {
  private loadingCache: CacheType<boolean>;

  public constructor(
    private callbackName: string,
    private url: string,
    private emptyValue: unknown,
    private factories: {
      guest: FactoryType<GuestType>,
      cache: FactoryType<CacheType>,
    },
  ) {
    this.loadingCache = factories.cache.create(this);
  }

  public content<R extends GuestType>(guest: R): R {
    this.loadingCache.receive(true);
    const timer = setTimeout(() => {
      this.loadingCache.receive(false);
      guest.receive(this.emptyValue);
    }, 10_000);
    useScriptTag(
      this.url,
      () => {
        clearInterval(timer);
        const result = (window as any)[this.callbackName]?.() || this.emptyValue;
        guest.receive(result);
        this.loadingCache.receive(false);
      },
    );
    return guest;
  }

  public loading<R extends GuestType<boolean>>(guest: R) {
    this.loadingCache.receiving(guest);
    return guest;
  }
}
