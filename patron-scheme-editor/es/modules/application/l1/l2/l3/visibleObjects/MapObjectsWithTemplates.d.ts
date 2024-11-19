import { MapObjectsType } from '../map/mapObject/MapObjectType';
import { MapType } from '../map/mapCurrent/MapType';
import { GuestObjectType, FactoryType, ChainType } from 'patron-oop';
import { MapObjectWithTemplateDocument } from './MapObjectWithTemplateDocument';
/**
 * Объекты карты с отрендеренным шаблоном HTML
 */
export declare class MapObjectsWithTemplates {
    private mapObjects;
    private map;
    private factories;
    constructor(mapObjects: MapObjectsType, map: MapType, factories: {
        chain: FactoryType<ChainType>;
        guestCast: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    objects<R extends GuestObjectType<MapObjectWithTemplateDocument[]>>(guest: R): R;
}
