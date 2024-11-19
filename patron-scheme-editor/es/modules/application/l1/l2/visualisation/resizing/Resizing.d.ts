import { MapDocument } from '../../l3/map/documents/MapStructures';
import { MapFileType } from '../../l3/map/mapFile/MapFileType';
import { LayerBase } from '../../l3/types/LayerBase';
import { BrowserCanvas } from '../../../../../integration/browser/canvas/BrowserCanvas';
import { FactoryType, GuestObjectType } from 'patron-oop';
/**
 * Обработка изменения размера редактора
 */
export declare class Resizing implements GuestObjectType<MapDocument> {
    private canvas;
    private konvaLayer;
    private factories;
    constructor(mapFile: MapFileType, canvas: BrowserCanvas, konvaLayer: LayerBase, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    give(): this;
}
