import { GuestObjectType, FactoryType, SourceType } from 'patron-oop';
import { MapCurrentIDType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentIDType';

export class MapCurrentID implements MapCurrentIDType {
  private idCache: SourceType<string>;

  public constructor(
    factories: {
      cache: FactoryType<SourceType>
    },
  ) {
    this.idCache = factories.cache.create('current');
  }

  public id<R extends GuestObjectType<string>>(guest: R) {
    this.idCache.value(guest);
    return guest;
  }

  public give(value: string): this {
    this.idCache.give(value);
    return this;
  }
}
