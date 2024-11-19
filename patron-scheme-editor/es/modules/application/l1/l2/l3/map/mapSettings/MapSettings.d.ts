import { MapSettingsDocument } from '../documents/MapStructures';
import { MapType } from '../mapCurrent/MapType';
import { MapFileType } from '../mapFile/MapFileType';
import { FactoryType, GuestObjectType } from 'patron-oop';
/**
 * Объект для сохранения настроек карты
 */
export declare class MapSettings implements GuestObjectType<MapSettingsDocument> {
    private mapFile;
    private map;
    private factories;
    constructor(mapFile: MapFileType, map: MapType, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    give(newSettings: MapSettingsDocument): this;
}
