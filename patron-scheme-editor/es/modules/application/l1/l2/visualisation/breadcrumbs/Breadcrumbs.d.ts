import { GuestObjectType, FactoryType, ChainType } from 'patron-oop';
import { MapObjectParentNamesType } from '../../l3/map/mapObject/MapObjectParentNamesType';
import { MapFileType } from '../../l3/map/mapFile/MapFileType';
export declare class Breadcrumbs {
    private parentNames;
    private mapFile;
    private factories;
    constructor(parentNames: MapObjectParentNamesType, mapFile: MapFileType, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
        guestCast: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
    });
    list<R extends GuestObjectType<unknown[]>>(guest: R): R;
}
