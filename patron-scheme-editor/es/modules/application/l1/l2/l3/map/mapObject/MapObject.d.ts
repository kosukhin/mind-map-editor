import { MapObjectType } from './MapObjectType';
import { MapObjectDocument } from '../documents/MapStructures';
import { MapType } from '../mapCurrent/MapType';
import { MapFileType } from '../mapFile/MapFileType';
import { GuestObjectType, FactoryType } from 'patron-oop';
/**
 * Сохранение объекта
 */
export declare class MapObject implements MapObjectType {
    private map;
    private mapFile;
    private factories;
    constructor(map: MapType, mapFile: MapFileType, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    give(value: MapObjectDocument): this;
}
