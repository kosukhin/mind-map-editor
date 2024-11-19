import { GuestObjectType, FactoryType, ChainType } from 'patron-oop';
import { MapObjectDocument } from '../map/documents/MapStructures';
import { MapObjectsType } from '../map/mapObject/MapObjectType';
import { LayerBase } from '../types/LayerBase';
import { BrowserCanvas } from '../../../../../integration/browser/canvas/BrowserCanvas';
import { MapFileType } from '../map/mapFile/MapFileType';
/**
 * Объект для определения видимых объектов
 */
export declare class MapObjectsVisible implements MapObjectsType {
    private visibleObjectsCache;
    constructor(layerDep: LayerBase, canvas: BrowserCanvas, mapFile: MapFileType, factories: {
        chain: FactoryType<ChainType<unknown>>;
        patron: FactoryType<GuestObjectType<unknown>>;
        guest: FactoryType<GuestObjectType<unknown>>;
    });
    objects(guest: GuestObjectType<MapObjectDocument[]>): this;
    private isInBounding;
}
