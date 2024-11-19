import { MapType } from '../mapCurrent/MapType';
import { FactoryType, GuestObjectType } from 'patron-oop';
import { MapObjectType } from './MapObjectType';
import { PointDocument } from '../documents/PointDocument';
import { BrowserCanvas } from '../../../../../../integration/browser/canvas/BrowserCanvas';
import { StagePositionType } from '../../l4/types/stage/StagePositionType';
/**
 * Добавление нового объекта на карту
 */
export declare class MapObjectNew {
    private map;
    private mapObject;
    private canvas;
    private stagePosition;
    private factories;
    constructor(map: MapType, mapObject: MapObjectType, canvas: BrowserCanvas, stagePosition: StagePositionType, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    byTypeName(typeName: string, point: PointDocument): this;
}
