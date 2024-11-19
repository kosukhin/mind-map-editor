import { MapObjectDocument } from '../../l3/map/documents/MapStructures';
import { MapType } from '../../l3/map/mapCurrent/MapType';
import { MapFileType } from '../../l3/map/mapFile/MapFileType';
import { MapObjectsType } from '../../l3/map/mapObject/MapObjectType';
import { FactoryType, GuestObjectType } from 'patron-oop';
/**
 * Исправление реальных размеров объектов.
 * ТК сохраненные значения размеров объектов могут отличаться от
 * автоматически рассчитанных при рендеринге
 */
export declare class ObjectGeometryFix implements GuestObjectType<MapObjectDocument[]> {
    private mapFile;
    private map;
    private factories;
    private readonly innerReceive;
    constructor(objectsVisible: MapObjectsType, mapFile: MapFileType, map: MapType, factories: {
        guest: FactoryType<GuestObjectType>;
        patron: FactoryType<GuestObjectType>;
    });
    give(value: MapObjectDocument[]): this;
}
