import { FactoryType } from '@/modules/system/guest/FactoryType';
import { CacheType } from '@/modules/system/guest/CacheType';
import { GuestType } from '@/modules/system/guest/GuestType';
import debounce from 'lodash/debounce';
import { debug } from 'debug';

type FnType = () => void;

const localDebug = debug('Zindex');

export class Zindex implements GuestType<FnType> {
  private fnsCache: CacheType<FnType[]>;

  public constructor(
    private factories: {
      cache: FactoryType<CacheType>,
      patron: FactoryType<GuestType>,
      guest: FactoryType<GuestType>,
    },
  ) {
    this.fnsCache = factories.cache.create(this, []);
    this.fnsCache.receiving(factories.patron.create(
      factories.guest.create(debounce((fns: FnType[]) => {
        localDebug('zindex fns run');
        fns.forEach((fn) => fn());
      }, 50)),
    ));
  }

  public receive(value: () => void): this {
    localDebug('zindex received value');
    this.fnsCache.receiving(this.factories.guest.create((fns: FnType[]) => {
      this.fnsCache.receive(fns.concat(value));
    }));
    return this;
  }
}
