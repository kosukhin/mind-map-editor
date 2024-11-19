import { GuestAwareType, GuestObjectType, FactoryType, ChainType } from 'patron-oop';
import { PointDocument } from '../../l3/map/documents/PointDocument';
import { MapObjectsType } from '../../l3/map/mapObject/MapObjectType';
export declare class CursorWithObjects implements GuestAwareType<PointDocument> {
    private objectsVisible;
    private cursor;
    private factories;
    constructor(objectsVisible: MapObjectsType, cursor: GuestAwareType<PointDocument>, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
        guestCast: FactoryType<GuestObjectType>;
    });
    value(guest: GuestObjectType<PointDocument>): this;
}
