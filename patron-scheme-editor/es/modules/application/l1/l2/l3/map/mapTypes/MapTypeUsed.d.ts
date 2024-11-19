import { CheckType } from '../checks/CheckType';
import { MapTypeWithNameDocument } from '../documents/MapStructures';
import { GuestObjectType, FactoryType } from 'patron-oop';
import { MapFileType } from '../mapFile/MapFileType';
export declare class MapTypeUsed implements CheckType<MapTypeWithNameDocument> {
    private mapFile;
    private factories;
    constructor(mapFile: MapFileType, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    check(value: MapTypeWithNameDocument, guest: GuestObjectType<true | string>): this;
}
