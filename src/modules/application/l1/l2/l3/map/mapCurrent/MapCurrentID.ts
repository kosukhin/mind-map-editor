import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { CacheType } from '@/modules/system/guest/CacheType';
import { MapCurrentIDType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentIDType';

export class MapCurrentID implements MapCurrentIDType {
  private idCache: CacheType<string>;

  public constructor(
    private factories: {
      cache: FactoryType<CacheType>
    },
  ) {
    this.idCache = factories.cache.create(this, 'current');
  }

  public id<R extends GuestType<string>>(guest: R) {
    this.idCache.receiving(guest);
    return guest;
  }

  public receive(value: string): this {
    this.idCache.receive(value);
    return this;
  }
}
