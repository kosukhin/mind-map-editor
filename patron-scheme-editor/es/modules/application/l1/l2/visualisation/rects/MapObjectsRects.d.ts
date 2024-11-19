import { MapObjectDocument } from '../../l3/map/documents/MapStructures';
import { LayerBase } from '../../l3/types/LayerBase';
import { MapObjectsType, MapObjectType } from '../../l3/map/mapObject/MapObjectType';
import { GuestObjectType, FactoryType, SourceType } from 'patron-oop';
import { MapObjectCurrentType } from '../../l3/map/mapObject/MapObjectCurrentType';
import { ObjectPositionType } from '../../l3/l4/types/object/ObjectPositionType';
import { MapFileType } from '../../l3/map/mapFile/MapFileType';
/**
 * Объект для рендеринга квадратов на конве
 */
export declare class MapObjectsRects implements GuestObjectType<MapObjectDocument[]> {
    private konvaLayer;
    private mapFile;
    private mapObject;
    private mapObjectCurrent;
    private mapObjectForRendering;
    private objectPosition;
    private factories;
    private previouslyRenderedRects;
    constructor(konvaLayer: LayerBase, mapFile: MapFileType, mapObject: MapObjectType, mapObjectsVisible: MapObjectsType, mapObjectCurrent: MapObjectCurrentType, mapObjectForRendering: MapObjectType, objectPosition: ObjectPositionType, factories: {
        patronOnce: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
        cache: FactoryType<SourceType>;
    });
    give(objects: MapObjectDocument[]): this;
    introduction(): "patron";
}
