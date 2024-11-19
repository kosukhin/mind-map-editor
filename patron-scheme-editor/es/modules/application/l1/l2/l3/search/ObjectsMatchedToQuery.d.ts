import { GuestAwareType, GuestObjectType, FactoryType } from 'patron-oop';
import { MapObjectDocument } from '../map/documents/MapStructures';
import { MapType } from '../map/mapCurrent/MapType';
export declare class ObjectsMatchedToQuery {
    private map;
    private factories;
    constructor(map: MapType, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
    });
    objects<R extends GuestObjectType<MapObjectDocument[]>>(querySource: GuestAwareType<string>, guest: R): R;
}
