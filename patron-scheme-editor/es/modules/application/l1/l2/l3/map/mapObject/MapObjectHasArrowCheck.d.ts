import { CheckType } from '../checks/CheckType';
import { MapObjectDocument } from '../documents/MapStructures';
import { GuestObjectType, FactoryType } from 'patron-oop';
import { MapFileType } from '../mapFile/MapFileType';
/**
 * Проверяет что объект карты имеет хотя бы одну входяую стрелку
 */
export declare class MapObjectHasArrowCheck implements CheckType<MapObjectDocument> {
    private mapFile;
    private factories;
    constructor(mapFile: MapFileType, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    check(value: MapObjectDocument, guest: GuestObjectType<true | string>): this;
}
