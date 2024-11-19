import { MapDocument, MapFileDocument } from '../documents/MapStructures';
import { MapCurrentIDType } from '../mapCurrent/MapCurrentIDType';
import { MapFileType } from './MapFileType';
import { FactoryType, GuestObjectType, SourceType } from 'patron-oop';
/**
 * Отдельный источник текущего файла карты - только для целей быстрого рендеринга
 */
export declare class MapFileForRendering implements MapFileType {
    private mapId;
    private factories;
    private readonly mapCache;
    constructor(mapFile: MapFileType, mapId: MapCurrentIDType, factories: {
        cache: FactoryType<SourceType>;
        patron: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
    });
    currentMap(target: GuestObjectType<MapDocument>): GuestObjectType<MapDocument>;
    mapFile(target: GuestObjectType<MapFileDocument>): GuestObjectType<MapFileDocument>;
    give(value: MapFileDocument): this;
}
