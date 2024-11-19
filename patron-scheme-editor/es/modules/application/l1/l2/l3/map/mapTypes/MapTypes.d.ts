import { GuestObjectType, FactoryType, ChainType } from 'patron-oop';
import { MapTypeWithNameDocument } from '../documents/MapStructures';
import { MapFileType } from '../mapFile/MapFileType';
import { MapType } from '../mapCurrent/MapType';
import { CheckNotificationType } from '../checks/CheckNotificationType';
/**
 * Объект для сохранения типов узлов карты
 */
export declare class MapTypes implements GuestObjectType<MapTypeWithNameDocument> {
    private map;
    private mapFile;
    private checks;
    private factories;
    constructor(map: MapType, mapFile: MapFileType, checks: CheckNotificationType<MapTypeWithNameDocument>[], factories: {
        guest: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
    });
    give(value: MapTypeWithNameDocument): this;
}
