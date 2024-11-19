import { MapObjectParentNamesType } from '../mapObject/MapObjectParentNamesType';
import { MapFileType } from '../mapFile/MapFileType';
import { FactoryType, GuestObjectType, ChainType } from 'patron-oop';
import { MapTypeDocument } from '../documents/MapStructures';
export declare class ParentTypes {
    private parentNames;
    private mapFile;
    private factories;
    constructor(parentNames: MapObjectParentNamesType, mapFile: MapFileType, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
        guestCast: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
    });
    types<R extends GuestObjectType<MapTypeDocument[]>>(guest: R): R;
}
