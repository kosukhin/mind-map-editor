import { MapFileType } from '../../l3/map/mapFile/MapFileType';
import { MapObjectDocument } from '../../l3/map/documents/MapStructures';
import { GuestObjectType, Factory } from 'patron-oop';
/**
 * Контент для вывода меню карты
 */
export declare class Menu {
    private mapFile;
    private factories;
    constructor(mapFile: MapFileType, factories: {
        guestInTheMiddle: Factory<GuestObjectType>;
    });
    menuObjects<R extends GuestObjectType<MapObjectDocument[]>>(guest: R): R;
}
