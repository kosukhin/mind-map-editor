import { MapCurrentIDType } from '../mapCurrent/MapCurrentIDType';
import { FactoryType, GuestObjectType } from 'patron-oop';
import { MapObjectParentNamesType } from './MapObjectParentNamesType';
export declare class MapObjectParentNames implements MapObjectParentNamesType {
    private mapId;
    private factories;
    constructor(mapId: MapCurrentIDType, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
    });
    names<R extends GuestObjectType<string[]>>(guest: R): R;
}
