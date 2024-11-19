import { MapType } from './MapType';
import { MapDocument, MapObjectDocument, MapSettingsDocument, MapTypeDocument } from '../documents/MapStructures';
import { MapFileType } from '../mapFile/MapFileType';
import { GuestObjectType, FactoryType, SourceType } from 'patron-oop';
import { MapCurrentIDType } from './MapCurrentIDType';
/**
 * Объект для получения основных частей карты - объекты, типы, настройки.
 * и для сохранения карты.
 */
export declare class MapCurrent implements MapType {
    private mapFile;
    private mapId;
    private factories;
    private objectsCache;
    private settingsCache;
    private typesCache;
    constructor(mapFile: MapFileType, mapId: MapCurrentIDType, factories: {
        sourceEmpty: FactoryType<SourceType>;
        guest: FactoryType<GuestObjectType>;
        patron: FactoryType<GuestObjectType>;
    });
    settings<R extends GuestObjectType<MapSettingsDocument>>(guest: R): R;
    objects<R extends GuestObjectType<MapObjectDocument[]>>(guest: R): R;
    types<R extends GuestObjectType<MapTypeDocument[]>>(guest: R): R;
    give(value: MapDocument): this;
}
