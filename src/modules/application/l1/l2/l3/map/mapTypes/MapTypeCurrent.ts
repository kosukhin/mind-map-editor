import { MapTypeCurrentType } from '@/modules/application/l1/l2/l3/map/mapTypes/MapTypeCurrentType';
import { SourceType, FactoryType, GuestObjectType } from 'patron-oop';

/**
 * Объект для управления выбранным типом узла карты,
 * например для редактирования типа узла
 */
export class MapTypeCurrent implements MapTypeCurrentType {
  private idCache: SourceType<string>;

  public constructor(factories: {
    sourceEmpty: FactoryType<SourceType>
  }) {
    this.idCache = factories.sourceEmpty.create();
  }

  public typeId<R extends GuestObjectType<string>>(guest: R) {
    this.idCache.value(guest);
    return guest;
  }

  public give(value: string): this {
    this.idCache.give(value);
    return this;
  }
}
