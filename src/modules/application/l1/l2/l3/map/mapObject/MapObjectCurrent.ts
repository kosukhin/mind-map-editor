import {
  MapObjectCurrentType,
} from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectCurrentType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { CacheType } from '@/modules/system/guest/CacheType';

/**
 * Представление текущего выбранного объекта с логикой
 * бронирования выбранного объекта одним гостем
 */
export class MapObjectCurrent implements MapObjectCurrentType {
  private idCache: CacheType<string>;

  private silenceActivator: CacheType<GuestType<string> | false>;

  public constructor(private factories: {
    cache: FactoryType<CacheType>,
    guest: FactoryType<GuestType>
  }) {
    this.idCache = factories.cache.create(this);
    this.silenceActivator = factories.cache.create(this, false);
  }

  public silenceOn(activator: GuestType<string>) {
    this.silenceActivator.receive(activator);
    return this;
  }

  public silenceOff() {
    this.silenceActivator.receive(false);
    return this;
  }

  public objectId(guest: GuestType<string>): this {
    this.idCache.receiving(guest);
    return this;
  }

  public receive(value: string): this {
    this.silenceActivator.receiving(
      this.factories.guest.create((activator: GuestType<string> | false) => {
        // Если мы в режиме тишины то значение получает только тот кто активировал тишину
        if (activator) {
          activator.receive(value);
        } else {
          this.idCache.receive(value);
        }
      }),
    );
    return this;
  }
}
