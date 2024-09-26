import { GuestType } from '@/modules/system/guest/GuestType';
import { JSONPType } from '@/modules/application/l1/l2/requests/JSONPType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { useScriptTag } from '@vueuse/core';

export class JSONP implements JSONPType {
  public constructor(
    private callbackName: string,
    private url: string,
    private factories: {
      guest: FactoryType<GuestType>
    },
  ) {}

  public content(guest: GuestType): GuestType {
    useScriptTag(
      this.url,
      (el: HTMLScriptElement) => {
        console.log(el, this.callbackName);
      },
    );
    return guest;
  }
}
