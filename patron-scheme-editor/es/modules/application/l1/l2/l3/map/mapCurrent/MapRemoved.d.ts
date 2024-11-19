import { MapCurrentIDType } from './MapCurrentIDType';
import { MapFileType } from '../mapFile/MapFileType';
import { FactoryType, GuestObjectType } from 'patron-oop';
export declare class MapRemoved implements GuestObjectType<string> {
    private mapFile;
    private mapId;
    private factories;
    constructor(mapFile: MapFileType, mapId: MapCurrentIDType, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    give(mapId: string): this;
}
