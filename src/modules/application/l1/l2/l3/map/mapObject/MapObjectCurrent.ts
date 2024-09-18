import {
  MapObjectCurrentType,
} from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectCurrentType';
import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { CacheType } from '@/modules/system/guest/CacheType';

export class MapObjectCurrent implements MapObjectCurrentType {
  private idCache: CacheType<string>;

  public constructor(factories: {
    cache: FactoryType<CacheType>
  }) {
    this.idCache = factories.cache.create();
  }

  public objectId(guest: GuestType<string>): this {
    this.idCache.receiving(guest);
    return this;
  }

  receive(value: string): this {
    this.idCache.receive(value);
    return this;
  }
}
