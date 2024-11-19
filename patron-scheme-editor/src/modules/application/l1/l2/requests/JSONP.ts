import { GuestObjectType, FactoryType, SourceType } from 'patron-oop';
import { JSONPType } from '@/modules/application/l1/l2/requests/JSONPType';
import { useScriptTag } from '@vueuse/core';

export class JSONP implements JSONPType {
  private loadingCache: SourceType<boolean>;

  public constructor(
    private callbackName: string,
    private url: string,
    private emptyValue: unknown,
    private factories: {
      guest: FactoryType<GuestObjectType>,
      sourceEmpty: FactoryType<SourceType>,
    },
  ) {
    this.loadingCache = factories.sourceEmpty.create();
  }

  public content<R extends GuestObjectType>(guest: R): R {
    this.loadingCache.give(true);
    const timer = setTimeout(() => {
      this.loadingCache.give(false);
      guest.give(this.emptyValue);
    }, 10_000);
    useScriptTag(
      this.url,
      () => {
        clearInterval(timer);
        const result = (window as any)[this.callbackName]?.() || this.emptyValue;
        guest.give(result);
        this.loadingCache.give(false);
      },
    );
    return guest;
  }

  public loading<R extends GuestObjectType<boolean>>(guest: R) {
    this.loadingCache.value(guest);
    return guest;
  }
}
