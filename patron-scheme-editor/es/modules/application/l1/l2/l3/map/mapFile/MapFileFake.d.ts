import { MapDocument, MapFileDocument } from '../documents/MapStructures';
import { MapFileType } from './MapFileType';
import { GuestObjectType } from 'patron-oop';
/**
 * Фейковый объект для получения файла с картами
 */
export declare class MapFileFake implements MapFileType {
    private mapFileDocument;
    private currentMapPool;
    private mapFilePool;
    constructor(mapFileDocument: MapFileDocument);
    currentMap(target: GuestObjectType<MapDocument>): GuestObjectType<MapDocument>;
    mapFile(target: GuestObjectType<MapFileDocument>): GuestObjectType<MapFileDocument>;
    give(value: MapFileDocument): this;
}
