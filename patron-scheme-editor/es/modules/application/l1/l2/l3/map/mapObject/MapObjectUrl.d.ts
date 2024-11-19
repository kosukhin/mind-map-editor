import { MapObjectDocument } from '../documents/MapStructures';
import { GuestObjectType, FactoryType, GuestAwareType, SourceType } from 'patron-oop';
import { MapNameFromUrl } from '../mapCurrent/MapNameFromUrl';
import { MapCurrentIDType } from '../mapCurrent/MapCurrentIDType';
import { TextNoHtml } from '../../text/TextNoHtml';
export declare class MapObjectUrl {
    private mapId;
    private factories;
    constructor(mapId: MapCurrentIDType, factories: {
        guest: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
        source: FactoryType<SourceType>;
        mapNameFromUrl: FactoryType<MapNameFromUrl>;
        textNoHtml: FactoryType<TextNoHtml>;
    });
    open(object: MapObjectDocument, openByNameGuest: GuestObjectType<string>): this;
    url<R extends GuestObjectType<string>>(theObject: GuestAwareType<MapObjectDocument>, guest: R): R;
}
