import { MapTypeCurrentType } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeCurrentType';
import { CacheType } from '@/modules/system/guest/CacheType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { GuestType } from '@/modules/system/guest/GuestType';

export class MapTypeCurrent implements MapTypeCurrentType {
  private idCache: CacheType<string>;

  public constructor(factories: {
    cache: FactoryType<CacheType>
  }) {
    this.idCache = factories.cache.create();
  }

  public typeId(guest: GuestType<string>): this {
    this.idCache.receiving(guest);
    return this;
  }

  receive(value: string): this {
    this.idCache.receive(value);
    return this;
  }
}
