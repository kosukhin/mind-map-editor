import { MapTypeCurrentType } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeCurrentType';
import { CacheType } from '@/modules/system/guest/CacheType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { GuestType } from '@/modules/system/guest/GuestType';

/**
 * Объект для управления выбранным типом узла карты,
 * например для редактирования типа узла
 */
export class MapTypeCurrent implements MapTypeCurrentType {
  private idCache: CacheType<string>;

  public constructor(factories: {
    cache: FactoryType<CacheType>
  }) {
    this.idCache = factories.cache.create();
  }

  public typeId<R extends GuestType<string>>(guest: R) {
    this.idCache.receiving(guest);
    return guest;
  }

  receive(value: string): this {
    this.idCache.receive(value);
    return this;
  }
}
