import { MapTypeCurrentType } from './MapTypeCurrentType';
import { SourceType, FactoryType, GuestObjectType } from 'patron-oop';
/**
 * Объект для управления выбранным типом узла карты,
 * например для редактирования типа узла
 */
export declare class MapTypeCurrent implements MapTypeCurrentType {
    private idCache;
    constructor(factories: {
        sourceEmpty: FactoryType<SourceType>;
    });
    typeId<R extends GuestObjectType<string>>(guest: R): R;
    give(value: string): this;
}
