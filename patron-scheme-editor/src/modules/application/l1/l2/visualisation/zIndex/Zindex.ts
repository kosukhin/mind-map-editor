import { FactoryType, SourceType, GuestObjectType } from 'patron-oop';
import debounce from 'lodash/debounce';
import { debug } from 'debug';

type FnType = () => void;

const localDebug = debug('Zindex');

export class Zindex implements GuestObjectType<FnType> {
  private fnsCache: SourceType<FnType[]>;

  public constructor(
    private factories: {
      cache: FactoryType<SourceType>;
      patron: FactoryType<GuestObjectType>;
      guest: FactoryType<GuestObjectType>;
    },
  ) {
    this.fnsCache = factories.cache.create([]);
    this.fnsCache.value(
      factories.patron.create(
        factories.guest.create(
          debounce((fns: FnType[]) => {
            localDebug('zindex fns run');
            fns.forEach((fn) => fn());
          }, 50),
        ),
      ),
    );
  }

  public give(value: () => void): this {
    localDebug('zindex received value');
    this.fnsCache.value(
      this.factories.guest.create((fns: FnType[]) => {
        this.fnsCache.give(fns.concat(value));
      }),
    );
    return this;
  }
}
