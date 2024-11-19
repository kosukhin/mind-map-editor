import { MapObjectCurrentType } from './MapObjectCurrentType';
import { GuestObjectType, FactoryType, SourceType } from 'patron-oop';
/**
 * Представление текущего выбранного объекта с логикой
 * бронирования выбранного объекта одним гостем
 */
export declare class MapObjectCurrent implements MapObjectCurrentType {
    private drawer;
    private factories;
    private idCache;
    private silenceActivator;
    constructor(drawer: GuestObjectType<string>, factories: {
        sourceEmpty: FactoryType<SourceType>;
        source: FactoryType<SourceType>;
        patron: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
    });
    silenceOn(activator: GuestObjectType<string>): this;
    silenceOff(): this;
    objectId<R extends GuestObjectType<string>>(guest: R): R;
    give(value: string): this;
}
