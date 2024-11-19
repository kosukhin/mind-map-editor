import { GuestObjectType, FactoryType, ChainType } from 'patron-oop';
import { MapTypeDocument, MapTypeWithNameDocument } from '../documents/MapStructures';
import { MapType } from '../mapCurrent/MapType';
import { MapFileType } from '../mapFile/MapFileType';
import { CheckNotificationType } from '../checks/CheckNotificationType';
export declare class MapTypeRemoved implements GuestObjectType<MapTypeDocument> {
    private map;
    private mapFile;
    private checks;
    private factories;
    constructor(map: MapType, mapFile: MapFileType, checks: CheckNotificationType<MapTypeWithNameDocument>[], factories: {
        guest: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
    });
    give(value: MapTypeDocument): this;
}
