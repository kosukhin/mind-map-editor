import { GuestObjectType, FactoryType, ChainType } from 'patron-oop';
import { MapObjectDocument } from '../documents/MapStructures';
import { MapType } from '../mapCurrent/MapType';
import { MapFileType } from '../mapFile/MapFileType';
import { CheckNotificationType } from '../checks/CheckNotificationType';
export declare class MapObjectRemoved implements GuestObjectType<MapObjectDocument> {
    private map;
    private mapFile;
    private checks;
    private factories;
    constructor(map: MapType, mapFile: MapFileType, checks: CheckNotificationType<MapObjectDocument>[], factories: {
        guest: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
    });
    give(value: MapObjectDocument): this;
}
