import { MapType } from '../mapCurrent/MapType';
import { MapObjectCurrent } from './MapObjectCurrent';
import { MapObjectType } from './MapObjectType';
import { NewArrow } from '../../../visualisation/arrows/NewArrow';
import { FactoryType, GuestObjectType, SourceType } from 'patron-oop';
/**
 * Связь нескольких объектов стрелкой
 */
export declare class MapObjectsLink {
    private mapObjectCurrent;
    private map;
    private mapObject;
    private newArrow;
    private factories;
    private objectIdsCache;
    constructor(mapObjectCurrent: MapObjectCurrent, map: MapType, mapObject: MapObjectType, newArrow: NewArrow, factories: {
        guest: FactoryType<GuestObjectType>;
        cache: FactoryType<SourceType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    objectIds<R extends GuestObjectType<string[]>>(guest: R): R;
    startLink(): void;
}
